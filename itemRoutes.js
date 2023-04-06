"use strict";

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { BadRequestError, NotFoundError } = require("./expressError");

/** GET /items/:
 *
 * returns { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 },
  ...
]}
*/
router.get("/", function (req, res) {
  return res.json(db);
});

/** POST /items/:
 *
 * returns { added:{ name: "popsicle", price: 1.45 } }
 */
router.post("/", function (req, res) {
  if (req.body === undefined) throw new BadRequestError();
  const item = req.body;
  db.items.push(item);
  return res.status(201).json({ added: item });
});

/** GET /items/:name: returns item {name: "popsicle", "price": 1.45} or 404. */

router.get("/:name", function (req, res) {
  const item = db.items.find((item) => item.name === req.params.name);
  if (!item) {
    throw new NotFoundError();
  }
  return res.json(item);
});

/** PATCH /items/:name:
 * input: {name: "new popsicle", price: 2.45}
 * returns: {updated: {name: "new popsicle", price: 2.45}} or 404
 */

router.patch("/:name", function (req, res) {
  let item = db.items.find((item) => item.name === req.params.name);
  if (!item) {
    throw new NotFoundError();
  }

  const name = req.body.name || item.name;
  const price = req.body.price === undefined ? item.price : req.body.price;

  item.name = name;
  item.price = price;

  return res.json({ updated: item });
});

/** DELETE /items/:name: returns {message: "Deleted"} or 404*/

router.delete("/:name", function (req, res) {
  const itemIdx = db.items.findIndex((item) => item.name === req.params.name);
  console.log("itemIndex", itemIdx);
  if (itemIdx === -1) {
    throw new NotFoundError();
  }

  db.items.splice(itemIdx, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
