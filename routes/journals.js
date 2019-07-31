const { Router } = require('express');
const Journals = require('../controllers/Journals');
const isEmpty = require('../middlewares/isEmpty');
const resolvePostType = require('../middlewares/resolvePostType');
const validateJournalInput = require('../middlewares/validateJournalInput');
const verifyToken = require('../middlewares/verifyToken');
const validateId = require('../middlewares/validateId');

const journals = Router();

journals.post(
  '/',
  verifyToken,
  resolvePostType,
  isEmpty,
  validateJournalInput,
  Journals.create,
);

journals.get(
  '/',
  verifyToken,
  Journals.get,
);

journals.get(
  '/:id',
  verifyToken,
  validateId,
  Journals.getOne,
);

module.exports = journals;
