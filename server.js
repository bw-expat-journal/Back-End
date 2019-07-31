const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config(); // load .env variables

const router = require('./routes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Expat Journal',
  });
});

server.use('/api/v1/', router);

server.all('*', (req, res) => {
  res.status(404).send({
    message: 'The resource you are looking for does not exist',
  });
});

module.exports = server;
