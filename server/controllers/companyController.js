/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fetch = require("node-fetch");
const keys = require("../../keys.js");
const Company = require("../models/company.js");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const URI = "mongodb://localhost:27017/stockdb";

mongoose.connect(URI, { useNewUrlParser: true }, (err, db) => {
  console.log("MongoDB Connection opened on port 27017");
});

const companyController = {};
companyController.addCompany = (req, res, next) => {
  if (res.locals.cache) {
    // Chaining getCompany, if locals.cache exists then invoke next()
    console.log(
      "Existing Record, skipping write to DB:",
      res.locals.cache.ticker
    );
    next();
  } else {
    console.log("Attempted to fetch:", req.params.ticker);

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
          // _id: new mongoose.Types.ObjectId(), // Not needed
          ticker: data["Meta Data"]["2. Symbol"],
          prices: priceArray,
        });

        Company.findOneAndUpdate(
          { ticker: company.ticker },
          company,
          { upsert: true, useFindAndModify: true },
          (err, data) => {
            if (err) throw err;
            console.log("Adding new data to DB:", company.ticker);
            res.locals.cache = data;
            next();
          }
        );
      })
    );
  }
};

companyController.getCompany = (req, res, next) => {
  Company.findOne({ ticker: req.params.ticker }, (err, data) => {
    if (err) {
      res.send(err);
    }
    if (data) {
      res.locals.cache = data;
      console.log("Found existing data in DB:", data.ticker);
    } else {
      console.log("New ticker detected:", req.params.ticker);
    }
    next();
  });
};

module.exports = companyController;
