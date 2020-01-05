const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = require("bluebird");

const bookingDateSchema = new mongoose.Schema({
  date: String,
  available: Boolean,
  checkin: Boolean,
  rate: Number,
  checkout: Boolean,
  listingid: { type: Number, index: true }
});

const BookingDate = mongoose.model("BookingDate", bookingDateSchema);

const getBookingDateById = (req, callback) => {
  // console.log(req.params);
  BookingDate.findOne({ listingid: req.params.id }).exec((err, results) => {
    if (err) {
      console.log(`error in database model.getListingById`);
      callback(err);
    } else {
      console.log(`you hit database model.getListingById`);
      callback(null, results);
    }
  });
};

module.exports.BookingDate = BookingDate;
module.exports.getBookingDateById = getBookingDateById;
