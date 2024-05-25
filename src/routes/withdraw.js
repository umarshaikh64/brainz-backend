const Withdraw = require("../models/withdraw");

// Create a new withdraw request
const createWithdraw = async (req, res) => {
  const { tokenId, amount, toWalletAddress, transactionHash } = req.body;
  const userId = req.userId; // Set by the auth middleware

  try {
    const withdraw = await Withdraw.create({
      userId,
      tokenId,
      amount,
      toWalletAddress,
      transactionHash,
    });
    res
      .status(201)
      .json({ message: "Withdraw request created successfully", withdraw });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create withdraw request", error });
  }
};

// Get all withdraw requests for the authenticated user
const getUserWithdraws = async (req, res) => {
  const userId = req.userId; // Set by the auth middleware

  try {
    const withdraws = await Withdraw.findAll({ where: { userId } });
    res.status(200).json({ withdraws });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch withdraw requests", error });
  }
};

const updateWithdraw = async (req, res) => {
  const { id } = req.params; // Withdraw ID
  const { tokenId, amount, toWalletAddress, transactionHash, status } =
    req.body;

  try {
    const withdraw = await Withdraw.findByPk(id);

    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw request not found" });
    }

    withdraw.tokenId = tokenId;
    withdraw.amount = amount;
    withdraw.toWalletAddress = toWalletAddress;
    withdraw.transactionHash = transactionHash;
    withdraw.status = status;

    await withdraw.save();

    res
      .status(200)
      .json({ message: "Withdraw request updated successfully", withdraw });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update withdraw request", error });
  }
};

const deleteWithdraw = async (req, res) => {
  const { id } = req.params; // Withdraw ID

  try {
    const withdraw = await Withdraw.findByPk(id);

    if (!withdraw) {
      return res.status(404).json({ message: "Withdraw request not found" });
    }

    await withdraw.destroy();

    res.status(200).json({ message: "Withdraw request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete withdraw request", error });
  }
};

module.exports = {
  createWithdraw,
  getUserWithdraws,
  deleteWithdraw,
  updateWithdraw,
};
