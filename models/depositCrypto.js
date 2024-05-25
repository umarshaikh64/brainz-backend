const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const DepositCrypto = sequelize.define(
  "DepositCrypto",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionHash: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    requested_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tokenName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "deposit_cryptos",
  }
);

module.exports = DepositCrypto;
