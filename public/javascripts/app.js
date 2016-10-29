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
    const $price_span = $(this).siblings('span');
    let basePrice = +$price_span.attr('data-price');
    const totalPrice = basePrice * Number($('.cart__list--item--quantity').val());
 
    $price_span.attr('data-totalPrice', totalPrice);
    $price_span.text('$' + totalPrice);
    $('.cart__total-cost').val(cart_module.calculateTotalCost());
  });

  $cartList.on('change', 'li', function () {
    $('.cart__total-cost').val(cart_module.calculateTotalCost());
  });

});