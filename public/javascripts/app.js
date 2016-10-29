// Define our scripts in here.

import $ from "jquery";
import cart_module from './cart_module.js';

$(function() {

  // Cart_Module
  $('.menu-item').on('click', function () {
    cart_module.toggleFromCart($(this).find('div'));
  });

  $('.cart__list').on('input', '.cart__list--item--quantity', function () {
    const $price_span = $(this).siblings('span');
    let basePrice = +$price_span.attr('data-price');
    const totalPrice = basePrice * Number($('.cart__list--item--quantity').val());
 
    $price_span.attr('data-totalPrice', totalPrice);
    $price_span.text('$' + totalPrice);
  });

});