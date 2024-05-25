const express = require("express");
const { updateProfile } = require("../controllers/profileController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/update", authenticate, updateProfile);

module.exports = router;
