/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ticker: String,
  prices: [Number]
});

module.exports = mongoose.model("Company", companySchema);
