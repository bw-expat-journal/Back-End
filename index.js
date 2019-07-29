const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config(); // load .env variables

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

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
