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
  listingid: { type: Number, index: true }
});

let Listing = mongoose.model("Listing", schema);

const getListingById = (req, callback) => {
  Listing.findOne({ listingid: req.params.id }).exec((err, results) => {
    if (err) {
      console.log(`error in database model.getListingById`);
      callback(err);
    } else {
      console.log(`you hit database model.getListingById`);
      callback(null, results);
    }
  });
};

const getLimit10 = (req, callback) => {
  Listing.find({
    title: /req.query.query/
  })
    .limit(10)
    .exec((err, results) => {
      if (err) {
        console.log(`error in database model.getLimit10`);
        callback(err);
      } else {
        console.log(`you hit database model.getLimit10`);
        callback(null, results);
      }
    });
};

module.exports.Listing = Listing;
module.exports.getListingById = getListingById;
module.exports.getLimit10 = getLimit10;
