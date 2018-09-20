module.exports = (knex) => {
  return {

    save: (unique_code, original_url) => {
      return knex.table('url_items').insert({
        unique_code,
        original_url
      }).returning('id');
    },

    check_duplicate: (original_url) => {
      return knex.select()
        .from('url_items')
        .where({
          original_url
        });
    }, 


    delete: (unique_code) => {
      return knex('url_items')
        .where({
          unique_code: unique_code
        })
        .del();
    },

    find_by_code: (unique_code) => {
      return knex.select()
        .from('url_items')
        .where({
          unique_code
        });
    }
  }
};