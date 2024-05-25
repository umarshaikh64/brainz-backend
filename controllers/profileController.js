const User = require("../models/user");

const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.email = email;

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};

module.exports = { updateProfile };
