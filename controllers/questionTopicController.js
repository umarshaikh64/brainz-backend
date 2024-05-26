const QuestionTopic = require("../models/QuestionTopic");

const getAllQuestionTopic = async (req, res) => {
  try {
    const questionTopics = await QuestionTopic.findAll();
    res.status(200).json({
      message: "Fetch All Question Topics Success",
      questionTopics,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionTopicById = async (req, res) => {
  try {
    const questionTopic = await QuestionTopic.findByPk(req.params.id);
    if (questionTopic) {
      res.status(200).json({ message: "Fetch Question Topic Success", questionTopic });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestionTopic = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required (title, description).",
    });
  }
  try {
    const questionTopic = await QuestionTopic.create({ title, description });
    res.status(200).json({ message: "QuestionTopic Create Success", questionTopic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuestionTopic = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields are required (title, description).",
    });
  }
  try {
    const questionTopic = await QuestionTopic.findByPk(id);
    if (!questionTopic) {
      return res.status(404).json({ message: "QuestionTopic item not found" });
    }
    questionTopic.title = title;
    questionTopic.description = description;
    await questionTopic.save();
    res
      .status(200)
      .json({ message: "Question  updated successfully", questionTopic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestionTopic = async (req, res) => {
  try {
    const questionTopic = await QuestionTopic.findByPk(req.params.id);
    if (questionTopic) {
      await questionTopic.destroy();
      res.status(200).json({ message: "QuestionTopic Delete Success", questionTopic });
    } else {
      res.status(404).json({ message: "QuestionTopic not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuestionTopic,
  getQuestionTopicById,
  createQuestionTopic,
  updateQuestionTopic,
  deleteQuestionTopic,
};
