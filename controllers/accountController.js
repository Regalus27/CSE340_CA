const utilities = require("../utilities/")
const accountController = {}

accountController.buildLogin(req, res, next) {
    let nav = await utilities.getNav();
    res.render("account/login", {
        title: Login,
        nav,
    });
}

module.exports = accountController;