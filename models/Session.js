const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./user");
const Game = require("./Game");

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Session.hasMany(Game, { foreignKey: "sessionId" });
// User.hasMany(Session, { foreignKey: "userId" });
// Session.belongsTo(User, { foreignKey: "userId" });

module.exports = Session;
