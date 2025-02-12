const express = require('express');
const { assignOrRemoveRole, allUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/assignRole', assignOrRemoveRole);
router.get('/allUsers', allUsers);

module.exports = router;
