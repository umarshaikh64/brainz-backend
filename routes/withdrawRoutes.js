const express = require("express");
const {
  createWithdraw,
  getUserWithdraws,
  updateWithdraw,
  deleteWithdraw,
} = require("../controllers/withdrawController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticate, createWithdraw);

router.get("/", authenticate, getUserWithdraws);

router.put("/:id", authenticate, updateWithdraw);

router.delete("/:id", authenticate, deleteWithdraw);

module.exports = router;
