const fetch = require("node-fetch");
const keys = require("../../keys.js");
const Company = require("../models/company.js");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/stockdb",
  { useNewUrlParser: true },
  (err, db) => {
    console.log("MongoDB Connection opened on port 27017");
  }
);

const companyController = {};
companyController.addCompany = (req, res, next) => {
  if (res.locals.cache) {
    next();
  }
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
        // _id: new mongoose.Types.ObjectId(),
        ticker: data["Meta Data"]["2. Symbol"],
        prices: priceArray
      });

      Company.findOneAndUpdate(
        { ticker: company.ticker },
        company,
        { upsert: true, useFindAndModify: true },
        (err, data) => {
          if (err) throw err;
          res.locals.cache = data.toString();
        }
      );
    })
  );
};

companyController.getCompany = (req, res, next) => {
  Company.findOne({ ticker: req.params.ticker }, (err, data) => {
    if (err) {
      res.send(err);
    }
    if (data) {
      res.locals.cache = data.toString();
      next();
    }
  });
};

module.exports = companyController;
