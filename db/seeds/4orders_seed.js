// exports.seed = function(knex, Promise) {
  // return knex('orders').del()
  //   .then(function () {
  //     return Promise.all([
  //       knex('orders').insert({completed: false, customer_id: 25, order_date: '16/04/1992', restaurant_id: 7})
  //     ]);
  //   });
// };


//need to make sure that foreign keys match existing restaurants and customers

exports.seed = function(knex, Promise) {
  return Promise.all([
  knex('orders').insert({completed: false, customer_id: 1, order_date: '1992-04-16 09:10:00', restaurant_id: 1}),
  knex('orders').insert({completed: false, customer_id: 1, order_date: '2016-04-16 09:10:00', restaurant_id: 1})
  ]);
};