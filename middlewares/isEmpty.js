const { setErrorMsg, populateError } = require('../helpers');

const isEmpty = (req, res, next) => {
  let error;
  if (res.postType === 'signup') {
    error = populateError(req, 'email', 'password', 'confirm_password', 'first_name', 'last_name');
  }
  if (res.postType === 'login') {
    error = populateError(req, 'email', 'password');
  }
  if (res.postType === 'journals' && req.method === 'POST') {
    error = populateError(req, 'location', 'message');
  }
  if (error.length) {
    const errorMsg = setErrorMsg(error);
    return res.status(400).send({
      status: 400,
      error: errorMsg,
    });
  }
  return next();
};

module.exports = isEmpty;
