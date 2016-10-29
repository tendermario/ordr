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



let restaurantsOrders = getOrders(7);

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
      // Promise.all returns a promise ofr an array
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

          arrayOrders.push(prettyData);
          console.log('alpha');
          console.log(arrayOrders.length);
          console.log(orderResult.length);
        });
    }
    console.log('beta');
    console.log(arrayOrders);
  }

  function formatDishes(dishes) {
    let dishObj = {};
    dishes.forEach(d => dishObj[d.name] = d.quantity);
    return dishObj;
  }







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