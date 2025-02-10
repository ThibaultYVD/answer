const express = require('express');

const { getAllQuiz, getQuizWithDetails, saveQuizResponse, getQuizStatistics } = require('../controllers/quizController');

const router = express.Router();

router.get('/', getAllQuiz);
router.get('/getQuizWithDetails/:id', getQuizWithDetails);
router.get('/getQuizStatistics', getQuizStatistics);
router.post('/saveQuizResponse', saveQuizResponse);

module.exports = router;