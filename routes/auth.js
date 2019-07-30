const { Router } = require('express');
const Auth = require('../controllers/Auth');

const auth = Router();

auth.post(
  '/signup',
  Auth.signup,
);

module.exports = auth;
