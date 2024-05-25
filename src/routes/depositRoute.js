const express = require("express");
const { DepositCrypto } = require("../models/DepositCrypto");

const router = express.Router();
router.get("/:wallet_address", async (req, res) => {
  try {
    const getAllRequests = await DepositCrypto.find({
      wallet_address: req.params.wallet_address,
    });

    console.log(req.params.wallet_address);
    const depositRequests = getAllRequests.map((request, index) => ({
      ...request.toObject(),
      count: index + 1,
    }));
    console.log("Query result:", getAllRequests);
    return res.send(depositRequests);
  } catch (error) {
    return res.send({ message: error.message });
  }
});

module.exports = router;
