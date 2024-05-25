const express = require('express');
const router = express.Router();
const { ShopItem } = require('../models');
const { handleTokenSwap, confirmTransaction } = require('../services/cryptoService'); // hypothetical services

// Ticket and Diamond Packs
const ticketPacks = {
  '5_tickets': 10,
  '10_tickets': 20,
  '50_tickets': 100,
  '100_tickets': 200
};

const diamondPacks = {
  '5_diamonds': 10,
  '10_diamonds': 20,
  '50_diamonds': 100,
  '100_diamonds': 200
};

// Helper function to determine pack price
function getPackPrice(packType, quantity) {
  if (packType === 'tickets') {
    return ticketPacks[`${quantity}_tickets`];
  } else if (packType === 'diamonds') {
    return diamondPacks[`${quantity}_diamonds`];
  }
  return null;
}

// Get all shop items
router.get('/', async (req, res) => {
  try {
    const shopItems = await ShopItem.findAll();
    res.json(shopItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new shop item
router.post('/', async (req, res) => {
  try {
    const { name, type, price, userId } = req.body;
    const shopItem = await ShopItem.create({ name, type, price, userId });
    res.status(201).json(shopItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase a shop item
router.post('/purchase', async (req, res) => {
  try {
    const { packType, quantity, token, userId } = req.body;

    // Determine the price in USDT
    const priceInUSDT = getPackPrice(packType, quantity);
    if (!priceInUSDT) {
      return res.status(400).json({ message: 'Invalid pack type or quantity' });
    }

    // Handle token swap if the token is not USDT
    let finalAmountInUSDT;
    if (token !== 'USDT') {
      finalAmountInUSDT = await handleTokenSwap(token, priceInUSDT);
      if (finalAmountInUSDT < priceInUSDT) {
        return res.status(400).json({ message: 'Insufficient funds after swap, including slippage' });
      }
    } else {
      finalAmountInUSDT = priceInUSDT;
    }

    // Confirm the transaction
    const transactionConfirmed = await confirmTransaction(finalAmountInUSDT, userId);
    if (!transactionConfirmed) {
      return res.status(500).json({ message: 'Transaction confirmation failed' });
    }

    // Update the balance and create the shop item purchase record
    const shopItem = await ShopItem.create({ name: `${quantity} ${packType}`, type: packType, price: finalAmountInUSDT, userId });
    res.status(201).json(shopItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a shop item
router.put('/:id', async (req, res) => {
  try {
    const { name, type, price, userId } = req.body;
    const shopItem = await ShopItem.findByPk(req.params.id);
    if (!shopItem) {
      return res.status(404).json({ message: 'Shop item not found' });
    }
    await shopItem.update({ name, type, price, userId });
    res.json(shopItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a shop item
router.delete('/:id', async (req, res) => {
  try {
    const shopItem = await ShopItem.findByPk(req.params.id);
    if (!shopItem) {
      return res.status(404).json({ message: 'Shop item not found' });
    }
    await shopItem.destroy();
    res.json({ message: 'Shop item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
