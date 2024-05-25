const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Tickets = sequelize.define("Tickets", {
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Tickets.belongsTo(User);
User.hasOne(Tickets);

module.exports = Tickets;
