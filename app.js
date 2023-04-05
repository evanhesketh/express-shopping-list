"use strict";

const express = require("express");
const app = express();
const itemRoutes = require("./itemRoutes");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded());

/** handle all requests to '/items' */
app.use("/items", itemRoutes);


/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});
// end


module.exports = app;