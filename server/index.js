const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv/config");

const app = express();

//MiddleWares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("Home");
});

const characterRoutes = require("./api/routes/character");
const occupationRoutes = require("./api/routes/occupation");
const weaponSugRoutes = require("./api/routes/weapon_suggest");
const weaponOwnRoutes = require("./api/routes/weapon_own");
const sigilRoutes = require("./api/routes/sigil");
app.use("/character", characterRoutes);
app.use("/occupation", occupationRoutes);
app.use("/weaponSug", weaponSugRoutes);
app.use("/weaponOwn", weaponOwnRoutes);
app.use("/sigil", sigilRoutes);

mongoose.connect(
  process.env.MONGODB ||
    "mongodb+srv://CQ:cqadminister@yucluster1.oodvf.mongodb.net/CQ?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3001, () => {
  console.log("backend running on port 3001");
});
