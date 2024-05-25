const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ShopItem = sequelize.define('ShopItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

module.exports = ShopItem;
