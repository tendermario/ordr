// Define our scripts in here.

import $ from "jquery";

$(function() {

// Database pulling orders for customer page
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
});
