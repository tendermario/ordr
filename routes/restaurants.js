"use strict";
const express = require('express');
const router = express.Router();
// when accessing /restaurants, use these paths
// e.g. my.com/restaurants/new => "/new"
module.exports = (db) => {

        // let sampleOrderData = {
        //   dbData: [{
        //     id: 29,
        //     customer_name: "Hungry Afdane",
        //     order_date: "some date",
        //     completed: false,
        //     dishes: {
        //         bagel: 1,
        //         linguini: 1,
        //         duck: 1,
        //         pork: 2
        //     },
        //   },
        //   {
        //     id: 30,
        //     customer_name: "TRavis",
        //     order_date: "some date",
        //     completed: false,
        //     dishes: {
        //         bagel: 1,
        //         linguini: 10,
        //         duck: 10,
        //         pork: 2
        //     },
        //   }

        //   ]
        // };
        // res.render("../views/restaurants/index", sampleOrderData);
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