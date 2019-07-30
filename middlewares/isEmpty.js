const { setErrorMsg, populateError } = require('../helpers');

const isEmpty = (req, res, next) => {
  const error = populateError(req, 'email', 'password', 'confirm_password', 'first_name', 'last_name');
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
