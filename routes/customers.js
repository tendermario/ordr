"use strict";
const express = require('express');
const utilities_module = require('../utilities_module.js');
var client = require('twilio')('ACc9db17ac92a9765e5bc23cb5d96d8931', '86ce6796f1daee631d27163b878b96bb');
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

      res.render("../views/customers/index", {menuList});
    });

  });

  router.post('/outbound', function(request, response) {
        // We could use twilio.TwimlResponse, but Jade works too - here's how
        // we would render a TwiML (XML) response using Jade
        response.type('text/xml');
        response.render('outbound');
    });

  router.post("/submit", (req, res) => {

// This should be the publicly accessible URL for your application
        // Here, we just use the host for the application making the request,
        // but you can hard code it or use something different if need be
        var url = 'https://www.google.com';
        // var url = '/customers/outbound';

        // Place an outbound call to the user, using the TwiML instructions
        // from the /outbound route
        client.makeCall({
            to: '16048456782',
            from: '17787713963',
            url: url
        });

    const order = req.body;

    db.newOrder(order);

    res.redirect('/');
  });

  return router;

}

