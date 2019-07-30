const { Router } = require('express');
const Auth = require('../controllers/Auth');
const isEmpty = require('../middlewares/isEmpty');
const validateUserInput = require('../middlewares/validateUserInput');
const userExists = require('../middlewares/userExists');

const auth = Router();

auth.post(
  '/signup',
  isEmpty,
  validateUserInput,
  userExists,
  Auth.signup,
);

auth.post(
  '/login',
  Auth.login,
);

module.exports = auth;
