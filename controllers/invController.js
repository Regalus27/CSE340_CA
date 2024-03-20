const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

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
        errors: null
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

module.exports = invCont;