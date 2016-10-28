
exports.up = function(knex, Promise) {
  return knex.schema.table('orders',function(table){
      table.boolean('completed');
  });


};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders',function(table){
      table.dropColumn('completed');
  });
};
