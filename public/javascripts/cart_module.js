import $ from 'jquery';
import utilities_module from './utilities_module.js';

let cart_module = {};

let $cartList = $('.cart__list');

const _renderCartFactory = function () {
  const _buildCartItem = (obj) => {
    const $li = $(`<li id="${obj.converted_name}">`).addClass('cart__list--item');
    const $label = $('<label>').addClass('cart__list--item--name').text(obj.name);
    const $input = $('<input type="number" value="1" min="1">').addClass('cart__list--item--quantity');
    const $price = $(`<span data-price=${obj.price}>`).addClass("cart__list--item--price").text('$' + obj.price);

    $li.append($label);
    $li.append($price);
    $li.append($input);

    return $li;
  };

  return {
    addToCart: (item) => {
      const $cartItem = _buildCartItem(item);
      $cartList.append($cartItem);
    },
    removeFromCart: ($item) => {
      $item.remove();
      $('.cart__total-cost').val(cart_module.calculateTotalCost());
    },
    render: (cartArr) => {
      cartArr.forEach((obj) => {
        $cartList.append(_buildCartItem(obj));
      });
    }
  }
};

const _renderCart = _renderCartFactory();

cart_module.toggleFromCart = function ($obj) {
  const item = {
    name: $obj.find('.menu-item__name').text(),
    price: $obj.find('.menu-item__price').data('price'),
  };
  
  item.converted_name = utilities_module.convertWhitespaces(item.name);
  const itemInList = $cartList.find('#' + item.converted_name);

  if (itemInList.length) {
    _renderCart.removeFromCart(itemInList);
  } else {
    _renderCart.addToCart(item);
  }
};

cart_module.calculateTotalCost = function () {
  let totalCost = 0;

  $('.cart__list li').each(function() {
    const $itemPrice = $(this).children('span').attr('data-totalPrice');

    console.log($itemPrice);
    
    totalCost += Number($itemPrice);
  });
  return totalCost;
};


export default cart_module;



