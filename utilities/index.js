const invModel = require("../models/inventory-model");
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = `<ul class="nav_list">`;
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
}

// build html
Util.buildClassificationGrid = async function(data){
  let grid;
  if(data.length > 0){
    grid = '<ul id="inv-display">';
    data.forEach(vehicle => { 
      grid += '<li>';
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += '<hr />';
      grid += '<h2>';
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
      grid += '</h2>';
      grid += '<span>$'
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
}

// build html for item view
Util.buildItemGrid = async function(data) {

  let grid;

  if (data.length > 0) {
    let v = data[0]; // There should only ever be one.

    grid = `<div id=item_display_div>
    <img src="${v.inv_image}" alt="Image of ${v.inv_year} ${v.inv_make} ${v.inv_model}">
    <p>${v.inv_description}</p>
    <p>Color: ${v.inv_color}</p>
    <p>Miles: ${new Intl.NumberFormat("en-us").format(v.inv_miles)}</p>
    <p>Price: $${new Intl.NumberFormat("en-us").format(v.inv_price)}</p>
    </div>`;
  } else {
    grid = `<p>Sorry, no matching vehicle could be found.</p>`;
  }

  return grid;
}

// Build Login view TODO
Util.buildLoginGrid = function() {
  return `<div id="login_card">
  <form action="">
    <label for="account_email">Email:</label><br>
    <input type="text" name="account_email" id="account_email"><br>
    <label for="account_password">Password:</label><br>
    <input type="text" name="account_password" id="account_password"><br>
    <input type="submit" value="Submit">
  </form>
  <p>No account? <a href="/account/register/">Sign-up</a></p>
  </div>`;
}

Util.buildRegisterGrid = function() {
  return `<div id="register_card">
  <form action="/account/register/" method="post">
    <label for="account_firstname">First name:</label><br>
    <input type="text" name="account_firstname" id="account_firstname" required><br>
    <label for="account_lastname">Last name:</label><br>
    <input type="text" name="account_lastname" id="account_lastname" required><br>
    <label for="account_email">Email:</label><br>
    <input type="text" name="account_email" id="account_email" required><br>
    <label for="account_password">Password, Requires at minimum: 12 characters, 1 capital letter, 1 number, 1 special character</label><br>
    <input type="text" name="account_password" id="account_password" required><br>
    <input type="submit" value="Register">
  </form>
  </div>`;
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;