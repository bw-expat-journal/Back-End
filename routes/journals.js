const { Router } = require('express');
const Journals = require('../controllers/Journals');
const isEmpty = require('../middlewares/isEmpty');
const resolvePostType = require('../middlewares/resolvePostType');
const validateJournalInput = require('../middlewares/validateJournalInput');
const verifyToken = require('../middlewares/verifyToken');
const validateId = require('../middlewares/validateId');
const validateUser = require('../middlewares/validateUser');
const uploadImage = require('../middlewares/uploadImage');
const uploadToCloudinary = require('../middlewares/uploadToCloudinary');

const journals = Router();

journals.post(
  '/',
  verifyToken,
  resolvePostType,
  isEmpty,
  validateJournalInput,
  Journals.create,
);

journals.post(
  '/upload',
  verifyToken,
  uploadImage,
  uploadToCloudinary,
);

journals.put(
  '/:id',
  verifyToken,
  validateId,
  validateUser,
  resolvePostType,
  isEmpty,
  validateJournalInput,
  Journals.update,
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
  validateUser,
  Journals.getOne,
);

journals.delete(
  '/:id',
  verifyToken,
  validateId,
  validateUser,
  Journals.delete,
);

module.exports = journals;
