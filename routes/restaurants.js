"use strict";
const express = require('express');
const router = express.Router();
var client = require('twilio')('ACc9db17ac92a9765e5bc23cb5d96d8931', '86ce6796f1daee631d27163b878b96bb');
module.exports = (db) => {
    router.get("/", (req, res) => {
        // hard-coding restaurant as 1:
        let arrayOfOrders = db.getOrders(1).then((result) => {
            // console.log(result);
            res.render("../views/restaurants/index", {
                result
            });
        });
    });

    router.post("/", function(req, res) {
        console.log(req.body.order_id);
        console.log('before completeOrder');
        db.completeOrder(req.body.order_id).then((x) => {
            let customerNum = db.getPhoneNumber(req.body.order_id).then((result) => {

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
                console.log('twilio: ', result);
                //res.redirect('/restaurants');
            });
        });
    });
    // router.get("/:id", (req, res) => {
    //     // hard-coding restaurant as 1:
    //     let arrayOfOrders = db.getOrders(req.params.id).then((result) => {
    //         console.log(result);
    //         res.render("../views/restaurants/index", {
    //             result
    //         });
    //     });
    // });
    return router;
}