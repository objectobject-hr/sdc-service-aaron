const router = require("express").Router();
const controllers = require("./controllers");

router.route("/listings/:id").get(controllers.getListingById);

router.route("listings/search").get(controllers.getLimit10);

module.exports = router;
