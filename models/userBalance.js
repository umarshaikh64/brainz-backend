const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const UserBalance = sequelize.define("UserBalance", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserBalance.belongsTo(User);
User.hasMany(UserBalance);

module.exports = UserBalance;
