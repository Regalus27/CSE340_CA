const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const accountController = {};
const bcrypt = require("bcryptjs");

accountController.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav();
    const grid = utilities.buildLoginGrid();
    res.render("./account/login", {
        title: "Login",
        nav,
        grid,
        errors: null
    });
}

accountController.buildRegistrationPage = async function (req, res, next) {
    let nav = await utilities.getNav();
    const grid = utilities.buildRegisterGrid();
    res.render("./account/register", {
        title: "Register",
        nav,
        grid,
        errors: null
    });
}

// Process new account registration
accountController.registerAccount = async function registerAccount(req, res) {
    let nav = await utilities.getNav();
    const { account_firstname, account_lastname, account_email, account_password } = req.body;

    // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount (
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations ${account_firstname}, you successfully registered. Please log in.`
      );
      res.redirect(201, "/account/login");
    } else {
      req.flash("notice", "Sorry, the registration failed.");
      res.redirect(501, "/account/register");
    }
  }

module.exports = accountController;