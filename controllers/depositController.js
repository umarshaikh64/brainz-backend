const Deposit = require("../models/deposit");
const DepositCrypto = require("../models/depositCrypto");

const createDeposit = async (req, res) => {
  const { tokenId, amount, tokenName } = req.body;
  const userId = req.user.id;

  try {
    const deposit = await Deposit.create({ userId, tokenId, amount, tokenName, activityType: "deposit" });
    res.status(201).json({ message: "Deposit created successfully", deposit });
  } catch (error) {
    res.status(500).json({ message: "Failed to create deposit", error });
  }
};

const createWithdrawal = async (req, res) => {
  const { tokenId, amount, tokenName } = req.body;
  const userId = req.user.id;

  try {
    const withdrawal = await Deposit.create({ userId, tokenId, amount, tokenName, activityType: "withdrawal" });
    res.status(201).json({ message: "Withdrawal created successfully", withdrawal });
  } catch (error) {
    res.status(500).json({ message: "Failed to create withdrawal", error });
  }
};

const getUserDeposits = async (req, res) => {
  const userId = req.user.id;

  try {
    const deposits = await Deposit.findAll({ where: { userId, activityType: "deposit" } });
    res.status(200).json({ deposits });
  } catch (error) {
    res.status (500).json({ message: "Failed to fetch deposits", error });
  }
};

const getUserWithdrawals = async (req, res) => {
  const userId = req.user.id;

  try {
    const withdrawals = await Deposit.findAll({ where: { userId, activityType: "withdrawal" } });
    res.status(200).json({ withdrawals });
  } catch (error) {
    res.status (500).json({ message: "Failed to fetch withdrawals", error });
  }
};

const createCryptoDeposit = async (req, res) => {
  const {
    to,
    from,
    network,
    amount,
    tokenName,
    walletAddress,
    transactionHash,
  } = req.body;
  const userId = req.user.id;

  try {
    const depositCrypto = await DepositCrypto.create({
      userId,
      to,
      from,
      network,
      amount,
      tokenName,
      activityType: "deposit",
      walletAddress,
      transactionHash,
    });
    res.status(201).json({ message: "Crypto deposit created successfully", depositCrypto });
  } catch (error) {
    res.status(500).json({ message: "Failed to create crypto deposit", error });
  }
};

const createCryptoWithdrawal = async (req, res) => {
  const {
    to,
    from,
    network,
    amount,
    tokenName,
    walletAddress,
    transactionHash,
  } = req.body;
  const userId = req.user.id;

  try {
    const withdrawalCrypto = await DepositCrypto.create({
      userId,
      to,
      from,
      network,
      amount,
      tokenName,
      activityType: "withdrawal",
      walletAddress,
      transactionHash,
    });
    res.status(201).json({ message: "Crypto withdrawal created successfully", withdrawalCrypto });
  } catch (error) {
    res.status(500).json({ message: "Failed to create crypto withdrawal", error });
  }
};

const getUserCryptoDeposits = async (req, res) => {
  const userId = req.user.id;

  try {
    const depositCryptos = await DepositCrypto.findAll({ where: { userId, activityType: "deposit" } });
    res.status(200).json({ depositCryptos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crypto deposits", error });
  }
};

const getUserCryptoWithdrawals = async (req, res) => {
  const userId = req.user.id;

  try {
    const withdrawalCryptos = await DepositCrypto.findAll({ where: { userId, activityType: "withdrawal" } });
    res.status(200).json({ withdrawalCryptos });
  } catch (error) {
    res.status (500).json({ message: "Failed to fetch crypto withdrawals", error });
  }
};

module.exports = {
  createDeposit,
  createWithdrawal,
  getUserDeposits,
  getUserWithdrawals,
  createCryptoDeposit,
  createCryptoWithdrawal,
  getUserCryptoDeposits,
  getUserCryptoWithdrawals,
};
