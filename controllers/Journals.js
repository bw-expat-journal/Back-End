const journalModel = require('../models/journalModel');

class Journals {
  static async create(req, res) {
    const {
      location, message, image_url, caption,
    } = res.locals;
    const { userId } = req;
    const newJournal = {
      location,
      message,
      userId,
      caption,
      image_url,
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

  static async update(req, res) {
    const {
      location, message, image_url, caption,
    } = res.locals;
    const { userId } = req;
    const { id } = req.journal;
    const journal = {
      location,
      message,
      userId,
      caption,
      image_url,
    };
    try {
      const response = await journalModel.update(journal, id);
      res.status(200).send({
        journal: response,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async get(req, res) {
    try {
      const response = await journalModel.find(req.userId);
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

  static async delete(req, res) {
    const deleted = await journalModel.remove(req.journal.id);
    if (deleted) {
      res.status(200).send({
        message: 'Journal Deleted Successfully',
      });
    } else {
      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}

module.exports = Journals;
