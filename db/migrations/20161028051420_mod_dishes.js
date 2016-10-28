
exports.up = function(knex, Promise) {
  return knex.schema.table('dishes',function(table) {
    table.dropColumn('picture');
   // table.boolean('completed');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes',function(table) {
    table.integer('picture');

  });


};
