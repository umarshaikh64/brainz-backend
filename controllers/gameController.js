const Game = require("../models/Game");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json({
      message: "Fetch All Games Success",
      games,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      res.status(200).json({ message: "Fetch Game Success", game });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGame = async (req, res) => {
  const { title, description, imageIcon, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({
      message: "Title and status are required fields.",
    });
  }
  try {
    const game = await Game.create({ title, description, imageIcon, status });
    res.status(200).json({ message: "Game Create Success", game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageIcon, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({
      message: "Title and status are required fields.",
    });
  }
  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    game.title = title;
    game.description = description;
    game.imageIcon = imageIcon;
    game.status = status;
    await game.save();
    res.status(200).json({ message: "Game updated successfully", game });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (game) {
      await game.destroy();
      res.status(200).json({ message: "Game Delete Success", game });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
