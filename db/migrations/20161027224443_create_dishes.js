
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.integer('picture');
    table.integer('restaurant_id').unsigned().references('restaurants.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dishes');
};
