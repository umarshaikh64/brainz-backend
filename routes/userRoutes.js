const express = require("express");
const {
  signup,
  login,
  getUserProfile,
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, getUserProfile);

module.exports = router;
