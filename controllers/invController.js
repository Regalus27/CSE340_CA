const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const regResult = await invModel.registerClassification(classification_name); // This is an SQL injection waiting to happen.
  if (regResult) {
    req.flash("notice", `Successfully registered ${classification_name}`);
    res.redirect(201, "/inv/");
  } else {
    req.flash("notice", `Registration failed.`);
    res.redirect(501, "/inv/");
  }
}

// Build inventory using classification view
invCont.buildByClassificationId = async function(req, res, next) {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    });
}

invCont.buildByItemId = async function(req, res, next) {
    const item_id = req.params.itemId;
    const data = await invModel.getInventoryByItemId(item_id);
    const grid = await utilities.buildItemGrid(data);
    let nav = await utilities.getNav();
    const itemName = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`;
    res.render("./inventory/item", {
        title: itemName,
        nav,
        grid,
    });
}

invCont.buildClassificationView = async function(req, res, next) {
    const nav = await utilities.getNav();
    const grid = utilities.buildManagementNewClassificationGrid();
    res.render("./inventory/management", {
        title: "Add Classification",
        nav,
        errors:null,
        grid
    }); // still needs post route logic
}

invCont.buildManagementView = async function(req, res, next) {
    const nav = await utilities.getNav();
    const grid = utilities.buildManagementGrid();
    res.render("./inventory/management", {
        title: "Manage Site",
        nav,
        errors: null,
        grid
    });
}

module.exports = invCont;