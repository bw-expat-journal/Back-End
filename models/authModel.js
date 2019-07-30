const db = require('./dbConfig');

function find() {
  return db('users').select('id', 'email');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .returning(['id', 'email', 'first_name', 'last_name', 'is_admin']);
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
