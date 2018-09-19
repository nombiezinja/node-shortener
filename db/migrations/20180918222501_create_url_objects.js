
exports.up = function(knex, Promise) {
  return knex.schema.createTable('url_objects', function(table){
    table.increments('id').primary;
    table.string('code');
    table.string('original_url');
    table.index('code')
  });
};

exports.down = function(knex, Promise) {
  
};
