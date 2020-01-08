const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = require("bluebird");
const AutoIncrement = require("mongoose-sequence")(mongoose); // auto-incrementer for listingid property

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

schema.plugin(AutoIncrement, { inc_field: "listingid", start_seq: 10000001 }); // need to add plugin bc any newly created listings will not know what listingid to start at

const Listing = mongoose.model("Listing", schema);

const createListing = (req, callback) => {
  console.log(req.body);
  var newData = {
    title: req.body.title,
    venuetype: req.body.venuetype,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    sleepcapacity: req.body.sleepcapacity,
    squarefeet: req.body.squarefeet,
    reviewoverview: req.body.sleepcapacity,
    rating: req.body.rating,
    reviewnumber: req.body.reviewnumber,
    owners: req.body.owners,
    cleaningfee: req.body.cleaningfee,
    states: req.body.states,
    city: req.body.city,
    pic: req.body.pic
  };

  Listing.create(newData, (err, results) => {
    if (err) {
      console.log(`error in database model.createListing`);
      callback(err);
    } else {
      console.log(`you hit database model.createListing`);
      callback(null, results);
    }
  });
};

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

const updateListingById = (req, callback) => {
  console.log(req.params);
  var updateData = {
    title: req.body.title,
    venuetype: req.body.venuetype,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    sleepcapacity: req.body.sleepcapacity,
    squarefeet: req.body.squarefeet,
    reviewoverview: req.body.sleepcapacity,
    rating: req.body.rating,
    reviewnumber: req.body.reviewnumber,
    owners: req.body.owners,
    cleaningfee: req.body.cleaningfee,
    states: req.body.states,
    city: req.body.city,
    pic: req.body.pic
  };

  Listing.findOneAndUpdate(
    { listingid: req.params.id },
    updateData,
    { upsert: true },
    (err, results) => {
      if (err) {
        console.log(`error in database model.updateListingById`);
        callback(err);
      } else {
        console.log(`you hit database model.updateListingById`);
        callback(null, results);
      }
    }
  );
};

const deleteListingById = (req, callback) => {
  console.log(req.params);
  Listing.findOneAndRemove(
    { listingid: req.params.id },
    req.body,
    (err, results) => {
      if (err) {
        console.log(`error in database model.deleteListingById`);
        callback(err);
      } else {
        console.log(`you hit database model.deleteListingById`);
        callback(null, results);
      }
    }
  );
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
module.exports.updateListingById = updateListingById;
module.exports.deleteListingById = deleteListingById;
module.exports.createListing = createListing;
