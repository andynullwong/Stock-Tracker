const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT);
console.log(`App listening on Port ${PORT}`);
