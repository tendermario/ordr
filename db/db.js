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
    // Promise.all returns a promise for an array
    let id = order.id;
    var promise = knex.select("dishes.name", "order_dishes.quantity")
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

function newCustomer(customer) {
  return knex("customers").insert({
      name: customer.customer_name,
      phone_number: customer.phone_number,
      email: ""
    });
}

// database functions to give to the views
dbMethods = {
  // restaurant pulls all the orders for itself
  getOrders: function(restaurant_id) {
    return knex.select("orders.id", "customers.name AS customer_name", "orders.order_date")
      .from("orders")
      .join("customers", "customers.id", "orders.customer_id")
      .where("restaurant_id", restaurant_id)
      .then(function (orderResult) {
        return getOrdersArray(orderResult);
      });
    },
  // restaurant triggers order being cleared
  orderSuccess: function(order_id, cb) {},
  // customer posts a new order
  newOrder: function(order_info) {
    // current time
    Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;};
    let d = new Date,
    dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join('/') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
    // add a new customer
    newCustomer(order_info).returning('id')
      .then((customer_id) => {
    // add to order table
        knex('orders').insert({
          order_date: dformat,
          completed: false,
          customer_id: customer_id[0],
          restaurant_id: 1
        }).returning('id').then((order_id) => {
          // add to order_dishes table
          for (dish in order_info.dishes) {
            knex('dishes').select('id').where('name', dish).returning('id')
            .then((dish_id) => {
              console.log(order_info.dishes[dish]);
              knex('order_dishes').insert({
                order_id: order_id[0],
                dish_id: dish_id[0].id,
                quantity: order_info.dishes[dish]
              });
            });
          }
        });
      });
  },
  // customer page pulls the orders for the restaurant
  getMenu: function(restaurant_id) {
    return knex.select().from("dishes").where("restaurant_id", restaurant_id);
  },
  getRestaurant: function(restaurant_id) {
    return knex.select().from("restaurants").where("id", restaurant_id);
  }
}

module.exports =  {
  connect: (onConnect) => {
    onConnect(dbMethods);
  }
}

// order_info = {
//   customer: "Batman",
//   phone_number: '16048456782',
//   dishes: {
//     duck:1,
//     'a pig':4
//   }
// }

