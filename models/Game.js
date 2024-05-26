const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Session = require("./Session");
const User = require("./user");

const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  // sessionId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: "Sessions",
  //     key: "id",
  //   },
  // },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: "Users",
  //     key: "id",
  //   },
  // },
  // score: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Game, { foreignKey: "userId" });
Game.belongsTo(Session, { foreignKey: "sessionId" });
Game.belongsTo(User, { foreignKey: "userId" });

module.exports = Game;
