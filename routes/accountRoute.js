const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/accountValidation");
const baseController = require("../controllers/baseController");

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

// Process the login attempt
router.post(
    "/login/",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(baseController.buildHome)
);

module.exports = router;