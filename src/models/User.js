const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  privy_id: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  wallet_address: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  diamonds: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  tickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  has_accepted_terms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
  tableName: 'users'
});

module.exports = User;
