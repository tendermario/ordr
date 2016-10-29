
exports.seed = function(knex, Promise) {
  return Promise.all([
  knex('order_dishes').insert({quantity: 1, order_id: 1, dish_id: 1}),
  knex('order_dishes').insert({quantity: 1, order_id: 1, dish_id: 2}),
  knex('order_dishes').insert({quantity: 1, order_id: 1, dish_id: 3}),
  knex('order_dishes').insert({quantity: 2, order_id: 1, dish_id: 4}),

  knex('order_dishes').insert({quantity: 2, order_id: 2, dish_id: 2})
  ]);
};
