const express = require('express');
const User = require('../models/User');
const privy = require('../config/privyConfig'); 
const { verifyPrivyToken } = require('../middleware/authMiddleware'); 
const router = express.Router();

// Endpoint to authenticate and create a user profile if it doesn't exist
router.post('/authenticate', async (req, res) => {
  const { token } = req.body;

  try {
    const session = await privy.auth.verifyToken(token);
    const { user } = session;

    let localUser = await User.findOne({ where: { email: user.email } });

    if (!localUser) {
      localUser = await User.create({
        privy_id: user.id,
        email: user.email,
        wallet_address: user.wallet.address,
        has_accepted_terms: false
      });
    }

    res.status(200).json({
      message: "User authenticated successfully",
      userData: {
        id: localUser.id,
        email: localUser.email,
        diamonds: localUser.diamonds,
        tickets: localUser.tickets
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Authentication failed", error: err.message });
  }
});

// Endpoint to retrieve user profile
router.get('/profile', verifyPrivyToken, async (req, res) => {
  try {
    const localUser = await User.findOne({ where: { privy_id: req.user.id } });
    if (!localUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User profile retrieved successfully",
      userData: {
        id: localUser.id,
        email: localUser.email,
        diamonds: localUser.diamonds,
        tickets: localUser.tickets
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve user profile", error: err.message });
  }
});

// Endpoint to update user profile
router.put('/profile/:id', verifyPrivyToken, async (req, res) => {
  const { id } = req.params;
  const { email, diamonds, tickets } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      email,
      diamonds,
      tickets
    });

    res.json({
      message: "User profile updated successfully",
      userData: {
        id: user.id,
        email: user.email,
        diamonds: user.diamonds,
        tickets: user.tickets
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user profile", error: err.message });
  }
});

// Endpoint to delete user profile
router.delete('/profile/:id', verifyPrivyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user profile", error: err.message });
  }
});

module.exports = router;
