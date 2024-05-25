const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); v

const SwapTransaction = sequelize.define('SwapTransaction', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fromToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  toToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
});

module.exports = SwapTransaction;
