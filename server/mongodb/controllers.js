dbhelpers = require("../../dbhelpers/mongodb/model");

module.exports = {
  getListingById: (req, res) => {
    console.log(`you made it into controllers.getListingById`);
    dbhelpers.getListingById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getListingById`);
        res.status(200).send(results);
      }
    });
  },

  getLimit10: (req, res) => {
    console.log(`you made it into controllers.getLimit10`);
    dbhelpers.getLimit10(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      } else {
        console.log(`successful controllers.getLimit10`);
        res.status(200).send(results);
      }
    });
  }
};
