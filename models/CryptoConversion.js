const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CryptoConversion = sequelize.define("CryptoConversion", {
  fromCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = CryptoConversion;
