import $ from "jquery";
import toggleFromCart from './cart_module.js';

$(function() {
  //.find('.menu-item__name')
  $('.menu-item').on('click', function (event) {
    // let dish = {}; 
    // dish.name = $(this).data('name');
    
    toggleFromCart($(this).find('div'));

  });


alert('dtravis');



});

