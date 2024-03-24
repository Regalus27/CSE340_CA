const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const validator = require("../utilities/managementValidation");

// Management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Add Classification view
router.get("/new_classification/", utilities.handleErrors(invController.buildClassificationView));

// Add Vehicle view
router.get("/new_vehicle/", utilities.handleErrors(invController.buildVehicleView));

// Build view by inventory item
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));

// Build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Add classification to database
router.post(
    "/new_classification/",
    validator.classificationRules(),
    validator.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
);

module.exports = router;