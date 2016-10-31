import $ from "jquery";
import cart_module from './cart_module.js';

$(function() {

// Cart_Module

  const $cartList = $('.cart__list');

  $('.menu-item').on('click', function () {
    cart_module.toggleFromCart($(this).find('div'));
  });

  $cartList.on('input', '.cart__list--item--quantity', function () {
    const $li = $(this).parents('li');
    const $price = $li.children('.cart__list--item--price');
    const basePrice = Number($li.children('.cart__list--item--basePrice').text());
    const totalPrice = basePrice * Number( $li.children('.cart__list--item--quantity').val() );
    
    const classList = $(this).parents('li').attr('class');
    const foodItemClass = "." + classList.substring(0, classList.indexOf(' '));
  
    $(`${foodItemClass} .cart__list--item--quantity`).val($(this).val());
    $(`${foodItemClass} .cart__list--item--price`).text(totalPrice);
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
      customer_name: $('.submission-window__name').val(),
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

    //-----------------------RESTAURANT------------------


     $(".remove_chit_2").on('click', function(event) {
        $(this).closest('.order_chit').addClass('finished');
    });






});



