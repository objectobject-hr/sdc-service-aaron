const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = require("bluebird");

const schema = new mongoose.Schema(
  {
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
  },
  { collection: "listings" }
); // add second parameter 'collection: ____' to let mongo know to query this specific collection

const Listing = mongoose.model("Listing", schema);

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
  console.log(`INSIDE getLimit10 - this is req.query: `, req.query);
  Listing.find({
    // title: /req.query.query/
    title: { $regex: req.query.query, $options: "i" } //$options:'i' makes it case insensitive
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