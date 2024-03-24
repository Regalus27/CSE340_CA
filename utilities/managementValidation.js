const inventoryModel = require("../models/inventory-model");
const utilities = require(".");
const {body, validationResult } = require("express-validator");
const validate = {};

validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        const grid = utilities.buildManagementNewClassificationGrid();
        res.render("/inv/new_classification", {
            title: "Manage Site",
            nav,
            grid,
            errors
        })
        return;
    }
    next();
}

validate.classificationRules = () => {
    console.log("classificationRules");
    return [
        // classifcation name must be word, no special characters
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha()
            .withMessage("Classification name can only use letters (no spaces)")
    ];
}


module.exports = validate;

