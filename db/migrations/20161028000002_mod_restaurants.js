
exports.up = function(knex, Promise) {

  return knex.schema.table('restaurants', (table) => {
    table.renameColumn('phonenumber','phone_number');
    table.renameColumn('twillionumber','twillio_number');
  });



};

exports.down = function(knex, Promise) {
   table.renameColumn('phone_number','phonenumber');
   table.renameColumn('twillio_number','twillionumber');
};




// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('restaurants', (table) => {
//     table.increments('id').primary();
//     table.string('name');
//     table.string('address');
//     table.string('phonenumber');
//     table.string('email');
//     table.string('twillionumber');
//   });
// };

// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('restaurant');
// };
