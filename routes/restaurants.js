"use strict";
const express = require('express');
const router = express.Router();
//var client = require('twilio')('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
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
            console.log('twilio: ', result);
            console.log("before the redirect");
            console.log('after the redirect');
            res.send('ok');
            console.log('after res.send');
        });


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