const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Withdraw = sequelize.define("Withdraw", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tokenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  toWalletAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },
});

module.exports = Withdraw;
