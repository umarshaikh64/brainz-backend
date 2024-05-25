const express = require('express');
const router = express.Router();
const { SwapTransaction } = require('../models');

router.get('/', async (req, res) => {
  try {
    const swapTransactions = await SwapTransaction.findAll();
    res.json(swapTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const swapTransaction = await SwapTransaction.findByPk(req.params.id);
    if (!swapTransaction) {
      return res.status(404).json({ message: 'Swap transaction not found' });
    }
    res.json(swapTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, fromToken, toToken, amount } = req.body;
    const swapResult = await performTokenSwap(userId, fromToken, toToken, amount);
    if (!swapResult.success) {
      return res.status(400).json({ message: 'Token swap failed' });
    }
    const swapTransaction = await SwapTransaction.create({ userId, fromToken, toToken, amount });
    res.status(201).json(swapTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { userId, fromToken, toToken, amount } = req.body;
    const swapTransaction = await SwapTransaction.findByPk(req.params.id);
    if (!swapTransaction) {
      return res.status(404).json({ message: 'Swap transaction not found' });
    }
    const swapResult = await performTokenSwap(userId, fromToken, toToken, amount);
    if (!swapResult.success) {
      return res.status(400).json({ message: 'Token swap failed' });
    }
    await swapTransaction.update({ userId, fromToken, toToken, amount });
    res.json(swapTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const swapTransaction = await SwapTransaction.findByPk(req.params.id);
    if (!swapTransaction) {
      return res.status(404).json({ message: 'Swap transaction not found' });
    }
    await swapTransaction.destroy();
    res.json({ message: 'Swap transaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

async function performTokenSwap(userId, fromToken, toToken, amount) {
  return { success: true };
}

module.exports = router;
