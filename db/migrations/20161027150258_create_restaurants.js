
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('address');
    table.string('phonenumber');
    table.string('email');
    table.string('twillionumber');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
