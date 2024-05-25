const express = require("express");
const {
  createShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
} = require("../controllers/shopItemController");
const router = express.Router();

// Route to create a new shop item
router.post("/", createShopItem);

// Route to get all shop items
router.get("/", getAllShopItems);

// Route to get a shop item by ID
router.get("/:id", getShopItemById);

// Route to update a shop item by ID
router.put("/:id", updateShopItem);

// Route to delete a shop item by ID
router.delete("/:id", deleteShopItem);

module.exports = router;
