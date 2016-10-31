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
    const $price = $(this).siblings('.cart__list--item--price');
    const basePrice = Number($(this).siblings('.cart__list--item--basePrice').text());
    const totalPrice = basePrice * Number( $(this).val() );

    $price.text(totalPrice);

    $('.cart__total-cost').val(cart_module.calculateTotalCost());
  });
});
