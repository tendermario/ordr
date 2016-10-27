
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary();
    table.string('order_date');
    table.string('completed');
    table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE');
    table.integer('restaurant_id').unsigned().references('restaurants.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
