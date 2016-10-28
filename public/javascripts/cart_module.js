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
  const newArray = _itemsInCart.filter((obj) => {
    return obj.name !== item.name;
  });
  _renderCart(newArray);
};

const _renderCart = function (item) {
  const cartList = $('.cart__list');

  _buildCartItem = function (obj) => {
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
    render: (item) => {
      _itemsInCart.forEach((obj) => {
        htmlElm.append(_buildCartItem(obj));
      });
    }
  }
};

export default cart_module;


