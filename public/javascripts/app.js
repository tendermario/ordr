// Define our scripts in here.

import $ from "jquery";
import cart_module from './cart_module.js';

$(function() {

  $('.dish-item').on('click', (event) => {
    event.stopPropagation();
    let dish = {}; 
    dish.name = $(this).find('.dish-item__name').data();
    cart_module.toggleFromCart(dish);
  });


});