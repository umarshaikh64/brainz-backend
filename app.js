const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const profileRoutes = require("./routes/profileRoutes");
const depositRoutes = require("./routes/depositRoutes");
const withdrawRoutes = require("./routes/withdrawRoutes");
const shopRoutes = require("./routes/shopRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use("/profile", profileRoutes);
app.use("/deposit", depositRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/users", userRoutes);
app.use("/deposit", depositRoutes);
app.use("/api/shop", shopRoutes);
sequelize
  .sync() // Add { alter: true } option here
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
