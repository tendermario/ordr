import $ from "jquery";
import toggleFromCart from './cart_module.js';
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


// Database pulling orders for customer page
  let restaurantsOrders = getOrders(7);

    //-----------------------RESTAURANT------------------


     $(".remove_chit_2").on('click', function(event) {
        $(this).closest('.order_chit').addClass('finished');
    });


    // $(".order_chit").each(function(chit) {
    //     if($(this).data('completed') === true){
    //       $(this).addClass('finished');
    //     };
    // });

    // var ordersCompleted = [];
    // $(".remove_chit").on('click', function(event) {
    //     $(this).closest('.order_chit').addClass('finished');
    //     let order_id = $(this).closest('.order_chit').data('order_id');
    //     // if the order is already in the array remove it
    //     let orderInArray = ordersCompleted.indexOf(order_id);
    //     if (orderInArray !== -1) {
    //         ordersCompleted.splice(orderInArray, 1);
    //     } else {
    //         ordersCompleted.push(order_id);
    //     }
    //     console.log('order_id', order_id);
    //     $.ajax({
    //         url: "/restaurants",
    //         type: "POST",
    //         dataType: "json",
    //         data: {
    //             order_id: order_id
    //         },
    //         timeout: 5000,
    //         complete: function() {
    //             console.log('process complete');
    //         },
    //         success: function(data) {
    //             console.log(data);
    //             console.log('process sucess');
    //             window.location.replace('/restaurants');
    //         },
    //         error: function() {
    //             console.log('process error');
    //         }
    //     });
    //     $(this).remove();
    // });


});