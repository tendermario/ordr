import $ from "jquery";
import toggleFromCart from './cart_module.js';
$(function() {
    $('.menu-item').on('click', function(event) {
        toggleFromCart($(this).find('div'));
    });
    console.log("hello");
    var ordersCompleted = [];

    $(".remove_chit").on('click', function(event) {
        alert('button clicked');

        // toggle the button text between "done" and "not done"
        $(this).text() === "Queued: click to finish" ? $(this).text("Finished: click to queue") :$(this).text("Queued: click to finish");

        //find what the order number of the chit is
        let order_id = $(this).closest("header").find("#order_id").html()

        // if the order is already in the array remove it
        let orderInArray = ordersCompleted.indexOf(order_id);
        if(orderInArray!==-1){
          ordersCompleted.splice(orderInArray, 1);
        }else{
          ordersCompleted.push(order_id);
        }
        console.log('ordersCompleted',ordersCompleted);


        // $.ajax({
        //     url: '/restaurants',
        //     type: 'post',
        //     dataType: 'text'
        // }).done(function(data) {
        //     renderTweets(data);
        // }).fail(function(data) {
        //     console.log('failed');
        // })


    });
});