const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((val) => val._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, console.log(`server is started on port ${PORT}`));
