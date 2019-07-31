const authModel = require('../models/authModel');

class Journals {
  static async create(req, res) {
    res.status(200).send({
      message: 'Work in Progress',
    });
  }
}

module.exports = Journals;
