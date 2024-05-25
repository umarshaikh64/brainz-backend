const ShopItem = require("../models/shopItem");

// Create a new shop item
const createShopItem = async (req, res) => {
  const { name, type, amount, price } = req.body;

  try {
    const shopItem = await ShopItem.create({ name, type, amount, price });
    res
      .status(201)
      .json({ message: "Shop item created successfully", shopItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to create shop item", error });
  }
};

// Get all shop items
const getAllShopItems = async (req, res) => {
  try {
    const shopItems = await ShopItem.findAll();
    res.status(200).json({ shopItems });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shop items", error });
  }
};

// Get a shop item by ID
const getShopItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const shopItem = await ShopItem.findByPk(id);
    if (!shopItem) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    res.status(200).json({ shopItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shop item", error });
  }
};

// Update a shop item by ID
const updateShopItem = async (req, res) => {
  const { id } = req.params;
  const { name, type, amount, price } = req.body;

  try {
    let shopItem = await ShopItem.findByPk(id);
    if (!shopItem) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    shopItem = await shopItem.update({ name, type, amount, price });
    res
      .status(200)
      .json({ message: "Shop item updated successfully", shopItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update shop item", error });
  }
};

// Delete a shop item by ID
const deleteShopItem = async (req, res) => {
  const { id } = req.params;

  try {
    const shopItem = await ShopItem.findByPk(id);
    if (!shopItem) {
      return res.status(404).json({ message: "Shop item not found" });
    }
    await shopItem.destroy();
    res.status(200).json({ message: "Shop item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete shop item", error });
  }
};

module.exports = {
  createShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
};
