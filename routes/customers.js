"use strict";

const express = require('express');
const utilities_module = require('../utilities_module.js');
const router  = express.Router();

module.exports = (db) => {

// when accessing /customers, use these paths
// e.g. my.com/customers/ => "/index"
  router.get("/", (req, res) => {
    db.getMenu(1).then((data) => {
      let menuList = data;

      menuList.forEach((obj) => {
        obj.name_underscored = utilities_module.convertWhitespace(obj.name);
      });
      console.log(menuList);
      res.render("../views/customers/index", {menuList});
    });
  
  });

  router.post("/submit", (req, res) => {
    const order = req.body;
    
    db.newOrder(order).then(() => {
      res.redirect('/');
    });
  });

  return router;
}
