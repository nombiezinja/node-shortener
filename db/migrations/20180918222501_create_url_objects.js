
exports.up = function(knex, Promise) {
  return knex.schema.createTable('url_items', function(table){
    table.increments('id').primary;
    table.string('unique_code');
    table.string('original_url');
    table.index('unique_code')
  });
};

exports.down = function(knex, Promise) {
  
};
