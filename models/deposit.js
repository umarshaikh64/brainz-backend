const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Deposit = sequelize.define("Deposit", {
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
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },
});

module.exports = Deposit;
