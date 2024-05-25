// models/DepositCrypto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); 

const DepositCrypto = sequelize.define('DepositCrypto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  from: {
    type: DataTypes.STRING
  },
  network: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  walletAddress: {
    type: DataTypes.STRING
  },
  transactionHash: {
    type: DataTypes.STRING,
    unique: true
  },
  requested_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'Users', 
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'deposit_cryptos' 
});

module.exports = DepositCrypto;
