const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel');
const { generateToken } = require('../helpers');

class Auth {
  static async signup(req, res) {
    // res.status(200).send({
    //   message: 'Work in Progress',
    // });
    const { first_name, last_name, password, email } = res.locals;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = {
      first_name,
      last_name,
      password: hashedPassword,
      email,
    };
    const [newUserFromDb] = await authModel.add(newUser);
    if (newUserFromDb) {
      const token = generateToken(newUserFromDb.id, newUserFromDb.is_admin);
      return res.status(201).send({
        user: newUserFromDb,
        token,
      });
    }
    return res.status(500).send({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

module.exports = Auth;
