const express = require("express");
const {
  createShopItem,
  getShopItems,
  updateShopItem,
  deleteShopItem,
  purchaseItem,
  getPurchaseHistory,
} = require("../controllers/shopController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/items", authenticate, createShopItem);
router.get("/items", authenticate, getShopItems);
router.put("/items/:id", authenticate, updateShopItem);
router.delete("/items/:id", authenticate, deleteShopItem);
router.post("/purchase", authenticate, purchaseItem);
router.get("/transaction-history/:userId", authenticate, getPurchaseHistory);

module.exports = router;
