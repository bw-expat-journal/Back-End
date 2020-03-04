const journalModel = require('../models/journalModel');

async function validateUser(req, res, next) {
  const { userId } = req;

  try {
    const data = await journalModel.findBy({ userId });
    if (data) {
      return next();
    }
    return res.status(403).send({
      error: 'Not authorized to access this journal',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Internal Server Error',
    });
  }
}

module.exports = validateUser;
