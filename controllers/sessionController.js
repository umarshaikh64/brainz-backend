const Session = require("../models/Session");

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    res.status(200).json({
      message: "Fetch All Sessions Success",
      sessions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      res.status(200).json({ message: "Fetch Session Success", session });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSession = async (req, res) => {
  const {
    gameId,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    participants,
    sessionAnswers,
  } = req.body;

  if (!gameId || !title || !startDate || !startTime || !endDate || !endTime) {
    return res.status(400).json({
      message:
        "Required fields: gameId, title, startDate, startTime, endDate, endTime.",
    });
  }
  try {
    const session = await Session.create({
      gameId,
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      description,
      participants,
      sessionAnswers,
    });
    res.status(200).json({ message: "Session Create Success", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSession = async (req, res) => {
  const { id } = req.params;
  const {
    gameId,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    participants,
    sessionAnswers,
  } = req.body;

  if (!gameId || !title || !startDate || !startTime || !endDate || !endTime) {
    return res.status(400).json({
      message:
        "Required fields: gameId, title, startDate, startTime, endDate, endTime.",
    });
  }
  try {
    const session = await Session.findByPk(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    session.gameId = gameId;
    session.title = title;
    session.startDate = startDate;
    session.startTime = startTime;
    session.endDate = endDate;
    session.endTime = endTime;
    session.description = description;
    session.participants = participants;
    session.sessionAnswers = sessionAnswers;
    await session.save();
    res.status(200).json({ message: "Session updated successfully", session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (session) {
      await session.destroy();
      res.status(200).json({ message: "Session Delete Success", session });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};
