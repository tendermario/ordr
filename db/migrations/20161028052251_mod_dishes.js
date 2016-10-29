
exports.up = function(knex, Promise) {
  return knex.schema.table('dishes',function(table){
      table.string('picture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes',function(table){
      table.dropColumn('picture');

  });
};
