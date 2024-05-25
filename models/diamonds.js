const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Diamonds = sequelize.define("Diamonds", {
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Diamonds.belongsTo(User);
User.hasOne(Diamonds);

module.exports = Diamonds;
