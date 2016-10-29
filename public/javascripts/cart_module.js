import $ from "jquery";

let cart_module = {};
let itemsInCart = $('.cart ul');

const _renderCartFactory = function () {
  const $cartList = $('.cart__list');

  const _buildCartItem = (obj) => {
    const $li = $(`<li id="${obj.converted_name}">`).addClass('cart__list--item');
    const $label = $('<label>').addClass('cart__list--item--name').text(obj.name);
    const $input = $('<input type="number">').addClass('cart__list--item--quantity');

    $li.append($label);
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
    },
    render: (cartArr) => {
      cartArr.forEach((obj) => {
        $cartList.append(_buildCartItem(obj));
      });
    }
  }
};


const _renderCart = _renderCartFactory();

const convert = function (string) {
  return string.toLowerCase().replace(/\s/g, '_');
};

const toggleFromCart = function ($obj) {
  const item = {
    name: $obj.find('.menu-item__name').text(),
    price: $obj.find('.menu-item__price').data('price'),
  };
  
  item.converted_name = convert(item.name);
  const itemInList = $('.cart__list').find('#' + item.converted_name);

  if (itemInList.length) {
    _renderCart.removeFromCart(itemInList);
  } else {
    _renderCart.addToCart(item);
  }
};

export default toggleFromCart;



