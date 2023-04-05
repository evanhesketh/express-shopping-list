"use strict";

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

/** GET /items/:
 *
 * returns { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
*/
router.get('/', function(req, res) {
  return res.json(db);
});








module.exports = router;

