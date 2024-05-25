const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Diamond = require("../models/diamonds");
const Ticket = require("../models/tickets");
const Referral = require("../models/referral");
const { Op } = require("sequelize");
require("dotenv").config();

const generateReferralLink = (userId) => `https://yourapp.com/referral/${userId}`;

const signup = async (req, res) => {
  const { username, email, privy_id, wallet_address, terms_accepted } = req.body;

  if (!terms_accepted) {
    return res.status(400).json({ message: "You must accept the terms and conditions." });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { privy_id }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email or privy_id already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      privy_id,
      wallet_address,
      terms_accepted,
    });

    await Promise.all([
      Diamond.create({ userId: newUser.id }),
      Ticket.create({ userId: newUser.id }),
      Referral.create({ userId: newUser.id, referralLink: generateReferralLink(newUser.id) })
    ]);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error); // Log the actual error
    res.status(500).json({ message: "Failed to register user", error: error.message });
  }
};

const login = async (req, res) => {
  const { privy_id } = req.body;

  try {
    const user = await User.findOne({ where: { privy_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error); // Log the actual error
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      include: [Diamond, Ticket, Referral],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error); // Log the actual error
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
  }
};

module.exports = { signup, login, getUserProfile };
