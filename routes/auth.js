const { Router } = require('express');
const Auth = require('../controllers/Auth');
const isEmpty = require('../middlewares/isEmpty');
const validateUserInput = require('../middlewares/validateUserInput');
const userExists = require('../middlewares/userExists');
const resolvePostType = require('../middlewares/resolvePostType');

const auth = Router();

auth.post(
  '/signup',
  resolvePostType,
  isEmpty,
  validateUserInput,
  userExists,
  Auth.signup,
);

auth.post(
  '/login',
  resolvePostType,
  isEmpty,
  Auth.login,
);

module.exports = auth;
