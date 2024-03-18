const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");

// Build view for My Account
router.get("/:account", utilities.handleErrors(accountController.buildLogin));

module.exports = router;