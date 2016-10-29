"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

// when accessing /customers, use these paths
// e.g. my.com/customers/ => "/index"
  router.get("/", (req, res) => {
    
    res.render("../views/customers/index");
  });

  return router;
}
