const express = require('express');

const { getWelcomeMessage } = require('../controllers/serverController');

const router = express.Router();

router.get('/', getWelcomeMessage);

module.exports = router;