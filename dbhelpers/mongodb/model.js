const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = require("bluebird");

let schema = new mongoose.Schema({
  title: String,
  venuetype: String,
  bedrooms: Number,
  sleepcapacity: Number,
  bathrooms: Number,
  squarefeet: Number,
  reviewoverview: String,
  rating: String,
  reviewnumber: Number,
  owners: String,
  cleaningfee: String,
  states: String,
  city: String,
  pic: String,
  listingId: { type: Number, index: true }
});

let Listing = mongoose.model("Listing", schema);

module.exports = Listing;
