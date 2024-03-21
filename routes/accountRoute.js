const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/accountValidation");

// Build view for My Account
router.get("/login/", utilities.handleErrors(accountController.buildLogin));

// Build view for New Account
router.get("/register/", utilities.handleErrors(accountController.buildRegistrationPage));

// Post registration
router.post(
    "/register/", 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;