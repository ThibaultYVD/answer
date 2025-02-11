const express = require('express');
const { createQuiz, editQuiz, deleteQuiz } = require('../controllers/adminController');

const router = express.Router();

router.post('/create', createQuiz);
router.put('/edit/:quiz_id', editQuiz);
router.delete('/delete/:quiz_id', deleteQuiz);

module.exports = router;