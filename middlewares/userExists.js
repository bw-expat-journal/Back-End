const authModel = require('../models/authModel');

const userExists = async (req, res, next) => {
  const { email } = res.locals;
  const user = await authModel.findBy({ email });
  if (user) {
    return res.status(409).send({
      status: 409,
      error: 'Email address already exists',
    });
  }
  return next();
};

module.exports = userExists;
