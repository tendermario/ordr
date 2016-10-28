
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_dishes',function(table){
    table.increments('id').primary();
    table.integer('quantity');
    table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE');
    table.integer('dish_id').unsigned().references('dishes.id').onDelete('CASCADE');
  });

};

exports.down = function(knex, Promise) {

};
