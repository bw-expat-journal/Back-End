const { Router } = require('express');
const auth = require('./auth');
const journals = require('./journals');

const router = Router();

router.use('/auth', auth);
router.use('/journals', journals);

module.exports = router;
