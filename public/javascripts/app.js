import $ from "jquery";
import toggleFromCart from './cart_module.js';
$(function() {
    $('.menu-item').on('click', function(event) {
        toggleFromCart($(this).find('div'));
    });
    // Cart_Module
    const $cartList = $('.cart__list');
    $('.menu-item').on('click', function() {
        cart_module.toggleFromCart($(this).find('div'));
    });
    $cartList.on('input', '.cart__list--item--quantity', function() {
        const $price_span = $(this).siblings('span');
        let basePrice = +$price_span.attr('data-price');
        const totalPrice = basePrice * Number($('.cart__list--item--quantity').val());
        $price_span.attr('data-totalPrice', totalPrice);
        $price_span.text('$' + totalPrice);
        $('.cart__total-cost').val(cart_module.calculateTotalCost());
    });
    $cartList.on('change', 'li', function() {
        $('.cart__total-cost').val(cart_module.calculateTotalCost());
    });
    //-----------------------RESTAURANT------------------
    var ordersCompleted = [];
    $(".remove_chit").on('click', function(event) {
        $(this).closest('.order_chit').addClass('finished');
        let order_id = $(this).closest('.order_chit').data('order_id');
        // if the order is already in the array remove it
        let orderInArray = ordersCompleted.indexOf(order_id);
        if (orderInArray !== -1) {
            ordersCompleted.splice(orderInArray, 1);
        } else {
            ordersCompleted.push(order_id);
        }
        console.log('order_id', order_id);
        $.ajax({
            url: "/restaurants",
            type: "POST",
            dataType: "json",
            data: {
                order_id: order_id
            },
            timeout: 5000,
            complete: function() {
                console.log('process complete');
            },
            success: function(data) {
                console.log(data);
                console.log('process sucess');
                window.location.replace('/restaurants');
            },
            error: function() {
                console.log('process error');
            }
        });
        $(this).remove();
    });
});