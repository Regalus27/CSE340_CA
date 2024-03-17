const pool = require("../database/");

/**
 * Get classification data
 */
async function getClassifications() {
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = ${classification_id}`
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

async function getInventoryByItemId(item_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inv_id = ${item_id}`
    )
    return data.rows;
  } catch (error) {
    console.error("getitembyid error: " + error);
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByItemId};