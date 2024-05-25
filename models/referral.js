const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Referral = sequelize.define("Referral", {
  referralLink: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  invites: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  earn: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Referral.belongsTo(User);
User.hasOne(Referral);

module.exports = Referral;
