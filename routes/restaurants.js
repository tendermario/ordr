"use strict";

const express = require('express');
const router  = express.Router();


// when accessing /restaurants, use these paths
// e.g. my.com/restauarants/new => "/new"
module.exports = (db) => {

  // when
  router.get("/", (req, res) => {
    // hard-coding restaurant as 1:
    let arrayOfOrders = db.getOrders(1);
    let renderedData = { arrayOfOrders }
    res.render("../views/restaurants/index", renderedData);
  });

  router.get("/:id", (req, res) => {
    let restaurant_id = req.params.id;
    let arrayOfOrders = db.getOrders(restaurant_id);
    let renderedData = { arrayOfOrders }
    // passing order object to view
    res.render("../view/restaurants/index", renderedData);
  });

  return router;
}
