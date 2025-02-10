const express = require('express');

const { getAllQuizz, getQuizzWithDetails } = require('../controllers/quizzController');

const router = express.Router();

router.get('/', getAllQuizz);
router.get('/:id', getQuizzWithDetails);

module.exports = router;