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
        //db.deleteOrder(3);
        console.log(req.body.order_id);
        console.log('before completeOrder');
        //changed from completeOrder to deleteOrder
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

        }).then((x) => db.deleteOrder(req.body.order_id))
          .then(()=>{
             res.redirect('/restaurants');
          });
    });
    return router;
}