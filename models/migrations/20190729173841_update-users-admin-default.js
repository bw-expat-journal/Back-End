/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.alterTable('users', (users) => {
    users.boolean('is_admin').defaultTo('false').alter();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('users', (users) => {
    users.boolean('is_admin').alter();
  });
};
