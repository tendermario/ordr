// Define our scripts in here.

import $ from "jquery";
import cart_module from './cart_module.js';

$(function() {

// Cart_Module
  const $cartList = $('.cart__list');

  $('.menu-item').on('click', function () {
    cart_module.toggleFromCart($(this).find('div'));
  });

  $cartList.on('input', '.cart__list--item--quantity', function () {
    // const $price = $(this).siblings('.cart__list--item--price');
    const idString = $(this).parent().attr('id');
    const $liID = $('#' + idString);
    const $price = $liID.children('.cart__list--item--price');
    const basePrice = Number($liID.children('.cart__list--item--basePrice').text());
    const totalPrice = basePrice * Number( $liID.children('.cart__list--item--quantity').val() );
    
    $price.text(totalPrice);

    $('.cart__total-cost').val('Total: $' + cart_module.calculateTotalCost());
  });

  $('#sidebar__submit-button').on('click', function() {
    $('#submission-window').addClass('show--visability');
    $('#submission-window--background').addClass('show--block');
  });
  $('#submission-window--background').on('click', function() {
    $('#submission-window').removeClass('show--visability');
    $('#submission-window--background').removeClass('show--block');
  });

  $('#cart__submission__form').on('submit', function(event) { 
    event.preventDefault(); 
    let order = {
      phone_number: $('.submission-window__phone-number').val(),
      name: $('.submission-window__name').val(),
      dishes: {}
    };

    $('.cart__list li').each(function(item) {
      const name = $(this).children('.cart__list--item--name').text();
      const quantity = $(this).children('.cart__list--item--quantity').val();

      order.dishes[name] = quantity;
    });

    console.log(order);

    cart_module.submitCart(order);
  });



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
