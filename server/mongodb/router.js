const router = require("express").Router();
const controllers = require("./controllers");

router.route("/newlisting").post(controllers.createListing);

router
  .route("/mlistings/:id")
  .get(controllers.getListingById)
  .put(controllers.updateListingById)
  .delete(controllers.deleteListingById);

router.route("/listings/search").get(controllers.getLimit10);

router.route("/dates/:id").get(controllers.getBookingDateById);

module.exports = router;
