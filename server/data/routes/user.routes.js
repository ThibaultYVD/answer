const express = require('express');
const { assignRole } = require('../controllers/userController');

const router = express.Router();

router.post('/assignRole', assignRole);

module.exports = router;
