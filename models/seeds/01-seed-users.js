exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        email: 'john@doe.com',
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
        is_admin: '1',
      },
      {
        email: 'jane@doe.com',
        first_name: 'Jane',
        last_name: 'Doe',
        password: '123456',
      },
    ]));
};
