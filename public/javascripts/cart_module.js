import $ from 'jquery';
import utilities_module from './utilities_module.js';

let cart_module = {};

let $cartList = $('.cart__list');

const _renderCartFactory = function () {
  const _buildCartItem = (obj) => {
    const $li = $(`<li id="${obj.name_underscoredSpaces}">`).addClass('cart__list--item');
    const $label = $('<label>').addClass('cart__list--item--name').text(obj.name);
    const $input = $('<input type="number" value="1" min="1">').addClass('cart__list--item--quantity');
    const $dollarSign = $('<span class="cart__list--item--dollarSign">').text('$');
    const $price = $('<span class="cart__list--item--price">').text(obj.price);
    const $basePrice = $('<span class="cart__list--item--basePrice">').text(obj.price);
    console.log(obj.price);

    $li.append($label);
    $li.append($dollarSign);
    $li.append($price);
    $li.append($basePrice);
    $li.append($input);

    return $li;
  };

  return {
    addToCart: (item) => {
      const $cartItem = _buildCartItem(item);

      $cartList.append($cartItem);
      $('.cart__total-cost').val(cart_module.calculateTotalCost());
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
    name_underscoredSpaces: $obj.find('.menu-item__name').attr('data-name'),
    price: $obj.find('.menu-item__price').text(),
  };

  const itemInList = $cartList.find('#' + item.name_underscoredSpaces);

  if (itemInList.length) {
    _renderCart.removeFromCart(itemInList);
  } else {
    _renderCart.addToCart(item);
  }
};

cart_module.calculateTotalCost = function () {
  let totalCost = 0;

  $('.cart__list li').each(function() {
    const $itemPrice = Number( $(this).find('.cart__list--item--price').text() );
    totalCost += Number($itemPrice);
  });
  console.log(totalCost);
  return totalCost;
};


export default cart_module;


