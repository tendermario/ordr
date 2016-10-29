// exports.seed = function(knex, Promise) {
  // return knex('customers').del()
  //   .then(function () {
  //     return Promise.all([

  //       knex('customers').insert({name: 'Hungry AfDane', phone_number: "604-929-0034", email: "hungry_af@gmail.com"})
  //     ]);
  //   });
// };


exports.seed = function(knex, Promise) {
  knex('customers').insert({name: 'Hungry AfDane', phone_number: "604-929-0034", email: "hungry_af@gmail.com"});
};
