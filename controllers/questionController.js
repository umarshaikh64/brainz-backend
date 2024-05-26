const Question = require("../models/Question");

const getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json({
      message: "Fetch All Questions Success",
      questions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      res.status(200).json({ message: "Fetch Question Success", question });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { question, topicId, sessionId, answers } = req.body;

  if (!question || !topicId || !sessionId || !answers) {
    return res.status(400).json({
      message: "All fields are required (question, topicId, sessionId, answers).",
    });
  }
  try {
    const question = await Question.create({ question, topicId, sessionId, answers });
    res.status(200).json({ message: "Question Create Success", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, topicId, sessionId, answers } = req.body;

  if (!question || !topicId || !sessionId || !answers) {
    return res.status(400).json({
      message: "All fields are required (question, topicId, sessionId, answers).",
    });
  }
  try {
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: "Question item not found" });
    }
    question.question = question;
    question.topicId = topicId;
    question.sessionId = sessionId;
    question.answers = answers;
    await question.save();
    res
      .status(200)
      .json({ message: "Question  updated successfully", shopItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.destroy();
      res.status(200).json({ message: "Question Delete Success", question });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuestion,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
