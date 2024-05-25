const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  privy_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  wallet_address: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  usdtBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  terms_accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = User;
