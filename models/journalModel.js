const db = require('./dbConfig');

function find(id) {
  return db('journals')
    .join('users', 'users.id', 'userId')
    .where({ 'users.id': id })
    .select('users.first_name', 'journals.id', 'users.last_name', 'journals.location', 'journals.caption', 'journals.image_url', 'journals.message');
}

function findBy(filter) {
  return db('journals')
    .join('users', 'users.id', 'userId')
    .select('users.first_name', 'journals.id', 'users.last_name', 'journals.location', 'journals.caption', 'journals.image_url', 'journals.message')
    .where(filter)
    .first();
}

function findById(id) {
  return db('journals')
    .join('users', 'users.id', 'userId')
    .where({ 'journals.id': id })
    .select('users.first_name', 'users.last_name', 'journals.id', 'journals.location', 'journals.caption', 'journals.image_url', 'journals.message')
    .first();
}

async function add(journal) {
  const [newJournal] = await db('journals')
    .insert(journal, '*');
  return findById(newJournal.id);
}

async function update(journal, id) {
  const [updatedJournal] = await db('journals')
    .update(journal, '*')
    .where({ id });
  return findById(updatedJournal.id);
}

function remove(id) {
  return db('journals').where({ id }).del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};
