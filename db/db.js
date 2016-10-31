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

function getOrdersArray(orderResult) {
let arrayOrders = [];
  for (order of orderResult) {
   let id = order.id;

    var promise = knex.select("dishes.name", "order_dishes.quantity")
      .from("order_dishes")
      .join("dishes", "dishes.id", "order_dishes.dish_id")
      .where("order_dishes.order_id", order.id)
      .then(function (dishes) {

        let {customer_name, order_date, completed,restaurant_id} = order;
        let totalDishes = formatDishes(dishes);
        let prettyData = {
          id,
          customer_name,
          order_date,
          dishes: totalDishes,
          completed,
          restaurant_id
        };
        return prettyData;
      });
    arrayOrders.push(promise);
  }
  return Promise.all(arrayOrders);
}

function formatDishes(dishes) {
  let dishObj = {};
  dishes.forEach(d => dishObj[d.name] = d.quantity);
  return dishObj;
}

// database functions to give to the views
dbMethods = {
  // restaurant pulls all the orders for itself
  getOrders: function(restaurant_id) {
    return knex.select("orders.id", "customers.name AS customer_name", "orders.order_date","orders.completed","orders.restaurant_id")
      .from("orders")
      .join("customers", "customers.id", "orders.customer_id")
      .where("restaurant_id", restaurant_id)
      .then(function (orderResult) {

        return (getOrdersArray(orderResult));
      });
    },
  // restaurant triggers order being cleared
  orderSuccess: function(order_id, cb) {},
  // customer posts a new order
  newOrder: function(order_info, cb) {},
  // customer page pulls the orders for the restaurant
  getMenu: function(restaurant_id) {
    return knex.select().from("dishes").where("restaurant_id", restaurant_id);
  },

    //once order is done the order number is posted to the
    ///restaurants endpoint via an ajax. use this to determine an number from twilio to text
  getPhoneNumber: function(order_id){
  return knex.select("customers.phone_number")
    .from("orders")
    .join("customers", "customers.id", "orders.customer_id")
    .where("orders.id",order_id)
    .then(function (result) {
        return result[0].phone_number;
      });
  },
  completeOrder: function(order_id){
    console.log('inside completeOrder');
    return knex("orders").where("id",order_id).update("completed",true);
  },
  deleteOrder: function(order_id){
    console.log("inside delete order");
    return knex("orders").where("id",order_id).del();
  }


//select phone_number from orders join customers on orders.id = customers.id where orders.id = 1;
}

module.exports =  {
  connect: (onConnect) => {
    onConnect(dbMethods);
  }
}