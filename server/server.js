/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const companyController = require("./controllers/companyController.js");

const app = express();
const PORT = 3000;

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get(
  "/api/:ticker",
  companyController.getCompany,
  companyController.addCompany,
  companyController.getCompany,
  (req, res) => {
    res.send(res.locals.cache);
  }
);

app.listen(PORT);
console.log(`App listening on Port ${PORT}`);
