// exports.seed = function(knex, Promise) {
  // return knex('dishes').del()
  //   .then(function () {
  //     return Promise.all([
  //       knex('dishes').insert({name: "linguini", description: "sauce straight from the can", picture: 'linguini.jpg', restaurant_id: 7}),
  //       knex('dishes').insert({name: "bagel", description: "a bun with a hole", picture: 'bagel.jpg', restaurant_id: 7}),
  //       knex('dishes').insert({name: "duck", description: "peking style", picture: 'duck.jpg', restaurant_id: 7}),
  //       knex('dishes').insert({name: "pork", description: "vegan, gluten free", picture: 'pork.jpg', restaurant_id: 7})
  //     ]);
  //   });
// };

exports.seed = function(knex, Promise) {
  return Promise.all([ knex('dishes').insert({name: "linguini", description: "sauce straight from the can", picture: 'linguini.jpg', restaurant_id: 1, price: 14.00}),
  knex('dishes').insert({name: "bagel", description: "a bun with a hole", picture: 'bagel.jpg', restaurant_id: 1, price: 4.00}),
  knex('dishes').insert({name: "duck", description: "peking style", picture: 'duck.jpg', restaurant_id: 1, price: 20.00}),
  knex('dishes').insert({name: "a pig", description: "vegan, gluten free", picture: 'pig.jpg', restaurant_id: 1, price: 300.00}),
  knex('dishes').insert({name: "kd", description: "aussies don't know about it", picture: 'kd.jpg', restaurant_id: 1, price: 2.00}),
  knex('dishes').insert({name: "dipping sauce", description: "probably ranch", picture: 'sauce.jpg', restaurant_id: 1, price: 0.25})]);
};
