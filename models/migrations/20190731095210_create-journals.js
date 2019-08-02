exports.up = function (knex) {
  return knex.schema.createTable('journals', (journals) => {
    journals.increments();
    journals
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    journals.string('image_url', 255);
    journals.string('location', 255).notNullable();
    journals.string('caption', 255);
    journals.string('message', 255);
    journals.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('journals');
};
