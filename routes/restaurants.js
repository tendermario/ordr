"use strict";
const express = require('express');
const router = express.Router();
var client = require('twilio')('ACc9db17ac92a9765e5bc23cb5d96d8931', '86ce6796f1daee631d27163b878b96bb');
module.exports = (db) => {
    router.get("/", (req, res) => {
        let arrayOfOrders = db.getOrders(1).then((result) => {
            res.render("../views/restaurants/index", {
                result
            });
        });
    });
    router.post("/", function(req, res) {
        db.getPhoneNumber(req.body.order_id).then((result) => {
            client.sendSms({
                to: '+16048456782',
                from: '+17787713963',
                body: 'your food is ready fool'
            }, function(error, message) {
                if (!error) {
                    console.log('Success! The SID for this SMS message is:');
                    console.log(message.sid);
                    console.log('Message sent on:');
                    console.log(message.dateCreated);
                } else {
                    console.log('Oops! There was an error.');
                    console.log(error);
                }
            });
        }).then((x) => db.deleteOrder(req.body.order_id)).then(() => {
            res.redirect('/restaurants');
        });
    });
    return router;
}