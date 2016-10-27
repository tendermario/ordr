
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.inc
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurant');
};
