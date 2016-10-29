// Define our scripts in here.

import $ from "jquery";
import toggleFromCart from './cart_module.js';

$(function() {

  $('.menu-item').on('click', function (event) {
    toggleFromCart($(this).find('div'));
  });

});