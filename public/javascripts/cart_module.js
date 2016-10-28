import $ from "jquery";

let cart_module = {};
let _itemsInCart = [];

cart_module.toggleFromCart = function (item) {
  const itemExists = _itemsInCart.find((obj) => {
    return obj.name === item.name;
  });

  typeof itemExists === 'undefined' ? _addToCart(item) : _removeFromCart(item);
};

const _addToCart = function (item) {
  _itemsInCart.push(item);
  _renderCart(_itemsInCart);
};

const _removeFromCart = function (item) {
  const newCartArr = _itemsInCart.filter((obj) => {
    return obj.name !== item.name;
  });
  _renderCart(newCartArr);
};

const _render_cart = function () {
  const $cartList = $('.cart__list');

  const _buildCartItem = (obj) => {
    const $li = $('<li>').addClass('cart__list--item');
    const $fieldset = $('<fieldset>').addClass('cart__list--item fieldset');
    const $label = $('label').addClass('cart__list--item--name').text(obj.name);
    const $input = $('input').addClass('cart__list--item--quantity');

    $li.append($fieldset);
    $li.append($label);
    $li.append($input);

    return $li;
  };

  return {
    render: (cartArr) => {
      cartArr.forEach((obj) => {
        $cartList.append(_buildCartItem(obj));
      });
    }
  }
};

const _renderCart = _render_cart();

export default cart_module;


