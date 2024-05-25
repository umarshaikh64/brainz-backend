const ShopItem = require("../models/shopItem");
const PurchaseHistory = require("../models/PurchaseHistory");
const { swapToUSDT } = require("../utils/swapUtils");
const sequelize = require("../config/database");
const User = require("../models/user");

const createShopItem = async (req, res) => {
  const { name, type, amount, price } = req.body;

  if (!name || !type || !amount || !price) {
    return res.status(400).json({
      message: "All fields are required (name, type, amount, price).",
    });
  }

  try {
    const shopItem = await ShopItem.create({ name, type, amount, price });
    res
      .status(201)
      .json({ message: "Shop item created successfully", shopItem });
  } catch (error) {
    console.error("Error creating shop item:", error);
    res
      .status(500)
      .json({ message: "Failed to create shop item", error: error.message });
  }
};

const getShopItems = async (req, res) => {
  try {
    const shopItems = await ShopItem.findAll();
    res.status(200).json({ shopItems });
  } catch (error) {
    console.error("Error fetching shop items:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch shop items", error: error.message });
  }
};

const updateShopItem = async (req, res) => {
  const { id } = req.params;
  const { name, type, amount, price } = req.body;

  if (!name || !type || !amount || !price) {
    return res.status(400).json({
      message: "All fields are required (name, type, amount, price).",
    });
  }

  try {
    const shopItem = await ShopItem.findByPk(id);

    if (!shopItem) {
      return res.status(404).json({ message: "Shop item not found" });
    }

    shopItem.name = name;
    shopItem.type = type;
    shopItem.amount = amount;
    shopItem.price = price;
    await shopItem.save();

    res
      .status(200)
      .json({ message: "Shop item updated successfully", shopItem });
  } catch (error) {
    console.error("Error updating shop item:", error);
    res
      .status(500)
      .json({ message: "Failed to update shop item", error: error.message });
  }
};

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
    console.error("Error deleting shop item:", error);
    res
      .status(500)
      .json({ message: "Failed to delete shop item", error: error.message });
  }
};

const purchaseItem = async (req, res) => {
  const { userId, id, fromCurrency, amount } = req.body;

  if (!userId || !id || !fromCurrency || !amount) {
    return res.status(400).json({
      message: "All fields are required (userId, id, fromCurrency, amount).",
    });
  }

  const transaction = await sequelize.transaction();

  try {
    const shopItem = await ShopItem.findByPk(id);
    if (!shopItem) {
      await transaction.rollback();
      return res.status(404).json({ message: "Shop item not found" });
    }

    let usdtAmount;
    if (fromCurrency !== "USDT") {
      usdtAmount = await swapToUSDT(amount, fromCurrency);
    } else {
      usdtAmount = amount;
    }

    if (usdtAmount < shopItem.price) {
      await transaction.rollback();
      return res.status(400).json({ message: "Insufficient USDT amount" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "User not found" });
    }

    if (user.usdtBalance < shopItem.price) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "User has insufficient USDT balance" });
    }

    // Deduct the USDT amount from the user's balance
    user.usdtBalance -= shopItem.price;

    // Increment diamonds or tickets based on shop item type
    if (shopItem.type === "Diamonds") {
      user.diamonds = (user.diamonds || 0) + shopItem.amount;
    } else if (shopItem.type === "Tickets") {
      user.tickets = (user.tickets || 0) + shopItem.amount;
    }

    // Save the updated user profile
    await user.save({ transaction });

    // Create purchase history with itemId provided
    await PurchaseHistory.create(
      {
        userId,
        itemId: shopItem.id, // Use shopItem.id as itemId
        itemType: shopItem.type,
        amount: shopItem.amount,
        price: shopItem.price,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({ message: "Purchase successful" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error during purchase:", error);
    res
      .status(500)
      .json({ message: "Failed to complete purchase", error: error.message });
  }
};

const getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve purchase history for the current user
    const purchaseHistory = await PurchaseHistory.findAll({
      where: { userId: userId },
    });

    // Send the purchase history data as a response
    res.status(200).json({ purchaseHistory });
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    res.status(500).json({
      message: "Failed to fetch purchase history",
      error: error.message,
    });
  }
};

module.exports = {
  createShopItem,
  getShopItems,
  updateShopItem,
  deleteShopItem,
  purchaseItem,
  getPurchaseHistory,
};
