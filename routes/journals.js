const { Router } = require('express');
const Journals = require('../controllers/Journals');
// const isEmpty = require('../middlewares/isEmpty');
const resolvePostType = require('../middlewares/resolvePostType');

const journals = Router();

journals.post(
  '/',
  resolvePostType,
  Journals.create,
);

module.exports = journals;
