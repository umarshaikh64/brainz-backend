const express = require("express");
const {
  createDeposit,
  createWithdrawal,
  getUserDeposits,
  getUserWithdrawals,
  createCryptoDeposit,
  createCryptoWithdrawal,
  getUserCryptoDeposits,
  getUserCryptoWithdrawals,
} = require("../controllers/depositController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/deposit", authenticate, createDeposit);
router.post("/withdrawal", authenticate, createWithdrawal);
router.get("/deposits", authenticate, getUserDeposits);
router.get("/withdrawals", authenticate, getUserWithdrawals);
router.post("/crypto/deposit", authenticate, createCryptoDeposit);
router.post("/crypto/withdrawal", authenticate, createCryptoWithdrawal);
router.get("/crypto/deposits", authenticate, getUserCryptoDeposits);
router.get("/crypto/withdrawals", authenticate, getUserCryptoWithdrawals);

module.exports = router;
