const fetch = require("node-fetch");
const keys = require("../../keys.js");
const Company = require("../models/company.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/", (err, db) => {
  console.log("MongoDB Connection opened on Port 27017");
});

const companyController = {};

companyController.addCompany = (req, res, next) => {
  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
      req.params.ticker
    }&apikey=${keys.alphaVantage}`
  ).then(data =>
    data.json().then(data => {
      let priceArray = [];
      const inputArray = Object.values(data["Time Series (Daily)"]);
      inputArray.forEach(day => priceArray.push(day["1. open"]));

      const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        ticker: data["Meta Data"]["2. Symbol"],
        prices: priceArray
      });
      //   console.log(company);
      db("stockmarket")
    })
  );
  next();
};

module.exports = companyController;
