import $ from 'jquery';
import utilities_module from './utilities_module.js';

let cart_module = {};

let $cartList = $('.cart__list');

const _renderCartFactory = function () {
  const _buildCartItem = (obj) => {
    const $li = $(`<li>`).addClass(`item-${obj.name_underscoredSpaces} cart__list--item`);
    const $input = $('<input type="number" value="1" min="1">').addClass('cart__list--item--quantity');
    const $label = $('<label>').addClass('cart__list--item--name').text(obj.name);
    const $dollarSign = $('<span class="cart__list--item--dollarSign">').text('$');
    const $price = $('<span class="cart__list--item--price">').text(obj.price);
    const $basePrice = $('<span class="cart__list--item--basePrice">').text(obj.price);

    $li.append($input);
    $li.append($label);
    $li.append($price);
    $li.append($dollarSign);
    $li.append($basePrice);

    return $li;
  };

  return {
    addToCart: (item) => {
      const $cartItem = _buildCartItem(item);
      $cartList.append($cartItem);
      $('.cart__total-cost').val('Total: $' + cart_module.calculateTotalCost());
    },
    removeFromCart: ($item) => {
      $item.remove();
      $('.cart__total-cost').val('Total: $' + cart_module.calculateTotalCost());
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

  const itemInList = $cartList.find('.item-' + item.name_underscoredSpaces);

  console.log(item.name_underscoredSpaces);

  if (itemInList.length) {
    _renderCart.removeFromCart(itemInList);
  } else {
    _renderCart.addToCart(item);
  }
};

cart_module.calculateTotalCost = function () {
  let totalCost = 0;

  $('.cart .cart__list li').each(function() {
    const $itemPrice = Number( $(this).find('.cart__list--item--price').text() );
    totalCost += Number($itemPrice);
  });

  return totalCost;
};

// AJAX Methods
cart_module.submitCart = (orderObj) => $.ajax({
  method: 'post',
  url: '/customers/submit',
  data: orderObj
});

export default cart_module;


