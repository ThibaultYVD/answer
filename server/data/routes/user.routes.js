const express = require('express');
const { assignRole, allUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/assignRole', assignRole);
router.get('/allUsers', allUsers);

module.exports = router;
