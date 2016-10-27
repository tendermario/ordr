"use strict";

const express = require('express');
const router  = express.Router();


// when accessing /restaurants, use these paths
// e.g. my.com/restauarants/new => "/new"
module.exports = (db) => {

  // when
  router.get("/", (req, res) => {
    res.render("../views/restaurants/index");
  });

  return router;
}
