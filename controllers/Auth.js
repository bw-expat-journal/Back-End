const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel');
const { generateToken } = require('../helpers');

class Auth {
  static async signup(req, res) {
    const {
      first_name, last_name, password, email,
    } = res.locals;
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

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await authModel.findBy({ email });
    if (!user) {
      return res.status(400).send({
        status: 400,
        error: 'Email is incorrrect',
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        status: 400,
        error: 'Password is incorrect',
      });
    }
    const token = generateToken(user.id, user.is_admin);
    return res.status(200).send({
      token,
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  }
}

module.exports = Auth;
