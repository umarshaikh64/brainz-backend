const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Game = require("./Game");

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: "id",
    },
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdDateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedDateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  participants: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  sessionAnswers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = Session;
