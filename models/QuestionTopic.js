const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const QuestionTopic = sequelize.define("QuestionTopic", {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  // tags: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = QuestionTopic;
