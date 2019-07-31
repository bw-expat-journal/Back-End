/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.table('users', (users) => {
    users.boolean('is_admin');
    users.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (users) => {
    users.dropColumn('is_admin');
    users.timestamps();
  });
};
