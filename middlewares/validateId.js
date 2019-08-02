const journalModel = require('../models/journalModel');

async function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
    return res.status(400).send({
      error: 'Invalid Journal ID provided',
    });
  }
  try {
    const data = await journalModel.findById(id);
    if (data) {
      req.journal = data;
      return next();
    }
    return res.status(404).send({
      error: 'Jounal ID provided does not exist',
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Internal Server Error',
    });
  }
}

module.exports = validateId;
