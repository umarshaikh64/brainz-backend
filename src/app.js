const express = require("express");
const sequelize = require("./config/sequelize");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
app.use(express.json());

// Establish database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync(); // Use { force: true } for development only!
  })
  .then(() => {
    console.log("DB Sync complete.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/games", gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
