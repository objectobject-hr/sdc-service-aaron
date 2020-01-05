dbListingHelpers = require("../../dbhelpers/mongodb/listingsModel");
dbBookingDateHelpers = require("../../dbhelpers/mongodb/bookingDatesModel");

module.exports = {
  createListing: (req, res) => {
    console.log(`you made it into controllers.createListing`);
    dbListingHelpers.createListing(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.createListing`);
        res.status(200).send(results);
      }
    });
  },

  getListingById: (req, res) => {
    console.log(`you made it into controllers.getListingById`);
    dbListingHelpers.getListingById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getListingById`);
        res.status(200).send(results);
      }
    });
  },

  updateListingById: (req, res) => {
    console.log(`you made it into controllers.updateListingById`);
    dbListingHelpers.updateListingById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.updateListingById`);
        res.status(200).send(results);
      }
    });
  },

  deleteListingById: (req, res) => {
    console.log(`you made it into controllers.deleteListingById`);
    dbListingHelpers.deleteListingById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.deleteListingById`);
        res.status(200).send(results);
      }
    });
  },

  getLimit10: (req, res) => {
    console.log(`you made it into controllers.getLimit10`);
    dbListingHelpers.getLimit10(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getLimit10`);
        res.status(200).send(results);
      }
    });
  },

  getBookingDateById: (req, res) => {
    console.log(`you made it into controllers.getBookingDateById`);
    dbBookingDateHelpers.getBookingDateById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getBookingDateById`);
        res.status(200).send(results);
      }
    });
  }
};
