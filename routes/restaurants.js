"use strict";
const express = require('express');
const router = express.Router();
// when accessing /restaurants, use these paths
// e.g. my.com/restaurants/new => "/new"
module.exports = (db) => {
    // when
    router.get("/", (req, res) => {
        let sampleOrderData = {
          dbData: [{
            id: 29,
            customer_name: "Hungry Afdane",
            order_date: "some date",
            dishes: {
                bagel: 1,
                linguini: 1,
                duck: 1,
                pork: 2
            },
          },
          {
            id: 30,
            customer_name: "TRavis",
            order_date: "some date",
            dishes: {
                bagel: 1,
                linguini: 10,
                duck: 10,
                pork: 2
            },
          }

          ]
        };
        res.render("../views/restaurants/index", sampleOrderData);
    });
    return router;
}