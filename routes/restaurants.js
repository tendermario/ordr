"use strict";

const express = require('express');
const router  = express.Router();


// when accessing /restaurants, use these paths
// e.g. my.com/restauarants/new => "/new"
module.exports = (db) => {

  // when
  router.get("/", (req, res) => {
    // hard-coding restaurant as 1:
    arrayOfOrders = db.getOrders(1);
    renderedData = { arrayOfOrders }
    res.render("../views/restaurants/index", renderedData);
  });

  router.get("/:id", (req, res) => {
    restaurant_id = req.params.id;
    arrayOfOrders = db.getOrders(restaurant_id);
    renderedData = { arrayOfOrders }
    // passing order object to view
    res.render("../view/restaurants/index", renderedData);
  });

  return router;
}
