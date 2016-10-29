import $ from "jquery";
import toggleFromCart from './cart_module.js';
$(function() {
    $('.menu-item').on('click', function(event) {
        toggleFromCart($(this).find('div'));
    });
    var ordersCompleted = [];
    $(".remove_chit").on('click', function(event) {
        if ($(this).text() === "Queued: click to finish") {
            $(this).text("Finished: click to queue")
        } else {
            $(this).text("Queued: click to finish");
        }
        //find what the order number of the chit is
        let order_id = $(this).closest("header").find("#order_id").html()
            // if the order is already in the array remove it
        let orderInArray = ordersCompleted.indexOf(order_id);
        if (orderInArray !== -1) {
            ordersCompleted.splice(orderInArray, 1);
        } else {
            ordersCompleted.push(order_id);
        }


         $(this).closest('.order_chit').data('id')


        $.ajax({
            url: '/restaurants',
            type: 'post',
            data: $(this).closest('.order_chit').data('id'),
            dataType: 'text',
        }).done(function(data) {
            console.log('ajax post done');
        }).fail(function(data) {
            console.log('ajax post failed');
        }).always(function(data) {
            console.log('ajax post always');
        });
    });
});

