require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT || 8080;
const pg = require('pg');

const knex = require('knex')( {
  client: 'pg',
  connection: {
    user     : process.env.DB_USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    host     : process.env.HOSTNAME,
    port     : process.env.PORT,
    ssl      : true
  }
});

const customersApi = require('./routes/customers');
const restaurantsApi = require('./routes/restaurants');

//////////////// db stuff

// Returns each dish for the restaurant
// knex.select("orders.id", "dishes.name AS dish_name", "order_dishes.quantity", "customers.name AS customer_name")
//   .from("restaurants")
//     .join("orders", "restaurants.id", "orders.restaurant_id")
//     .join("customers", "orders.customer_id", "customers.id")
//     .join("order_dishes", "orders.id", "order_dishes.order_id")
//     .join("dishes", "order_dishes.dish_id", "dishes.id")
//       .where("restaurants.id", 7)
//         .asCallback(function (err, result) {
//           if (err) throw err;
//           // console.log(result);
//         });

// For each unique order id from that restaurant:
// give order id, customer name, date

// get a list of all the dishes and their quantities.


// replace 7 with restaurant's id number when doing routes

const $ = require("jquery");

$(function() {
let restaurantsOrders = getOrders(7);
});

function getOrders(restaurant_id) {
  knex.select("orders.id", "customers.name AS customer_name", "orders.order_date")
    .from("orders")
    .join("customers", "customers.id", "orders.customer_id")
    .where("restaurant_id", restaurant_id)
    .then(function (orderResult) {
      return getOrdersArray(orderResult);
    });
}

function getOrdersArray(orderResult) {
  let arrayOrders = [];
      for (order of orderResult) {
        // console.log(order);
        let id = order.id;
        knex.select("dishes.name", "order_dishes.quantity")
          .from("order_dishes")
          .join("dishes", "dishes.id", "order_dishes.dish_id")
          .where("order_dishes.order_id", order.id)
          .then(function (dishes) {
            let {customer_name, order_date} = order;
            let totalDishes = formatDishes(dishes);
            let prettyData = {
              id,
              customer_name,
              order_date,
              dishes: totalDishes
            };
            // console.log(prettyData);

            arrayOrders.push(prettyData);
            if (orderResult[-1] = order) {
              return arrayOrders;
            }
          });
      }
      // console.log(arrayOrders);
}

function formatDishes(dishes) {
  let dishObj = {};
  dishes.forEach(d => dishObj[d.name] = d.quantity);
  return dishObj;
}

////////////////////

//// Server

const app = express();


// pass app into server method on http
const server = require('http').Server(app);

// telling socket.io to use http with our express server
const io = require('socket.io')(server);


//// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }))
app.use(express.static('public'));

// View Engine:
app.set("view engine", "ejs");


//// Routes

app.use('/customers', customersApi());

app.use('/restaurants', restaurantsApi());

app.get("/", (req, res) => {
  res.render("index");
});



// Start Server
app.listen(PORT, () => {
  console.log(`ordr app listening on port ${PORT}`);
} );