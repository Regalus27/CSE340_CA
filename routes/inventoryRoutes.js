const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Build view by inventory item
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));

// Build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

module.exports = router;