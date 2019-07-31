const journalModel = require('../models/journalModel');

class Journals {
  static async create(req, res) {
    const { location, post } = res.locals;
    const { userId } = req.decoded;
    const newJournal = {
      location,
      message: post,
      userId,
    };
    try {
      const response = await journalModel.add(newJournal);
      res.status(201).send({
        journal: response,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async get(req, res) {
    try {
      const response = await journalModel.find();
      res.status(200).send({
        journals: response,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async getOne(req, res) {
    res.status(200).send({
      journal: req.journal,
    });
  }
}

module.exports = Journals;
