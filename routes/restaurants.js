"use strict";
const express = require('express');
const router = express.Router();



// when accessing /restaurants, use these paths
// e.g. my.com/restaurants/new => "/new"
module.exports = (db) => {
    router.get("/", (req, res) => {
        // hard-coding restaurant as 1:
        let arrayOfOrders = db.getOrders(1).then((result) => {
            res.render("../views/restaurants/index", {
                result
            });
        });
    });

    router.post("/", function(req, res) {
        console.log(req.body.order_id);

        let customerNum = db.getPhoneNumber(req.body.order_id).then((result) => {
            console.log('twilio: ',result);
        });

        res.contentType('json');
        res.send({some: JSON.stringify({response: 'json'})});
    });

    router.get("/:id", (req, res) => {
        // hard-coding restaurant as 1:
        let arrayOfOrders = db.getOrders(req.params.id).then((result) => {
            res.render("../views/restaurants/index", {
                result
            });
        });
    });
    return router;
}