import $ from "jquery";
import toggleFromCart from './cart_module.js';
$(function() {
    $('.menu-item').on('click', function(event) {
        toggleFromCart($(this).find('div'));
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
        console.log('order_id',order_id);

        $.ajax({
            url: "/restaurants",
            type: "POST",
            dataType: "json",
            data: {order_id: order_id},
            timeout: 5000,
            complete: function() {
                console.log('process complete');
            },
            success: function(data) {
                console.log(data);
                console.log('process sucess');
            },
            error: function() {
                console.log('process error');
            },
        });

         $(this).remove();
    });
});