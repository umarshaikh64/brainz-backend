const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Question = sequelize.define("Question", {
    question: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "QuestionTopic",
            key: "id",
        },
    },
    sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Session",
            key: "id",
        },
    },
    answers: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Question;
