import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Proposal from '@components/quizz/Proposal';

const Question = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  score,
  showAnswer,
  timeLeft,
  timeNextQuestion,
  handleChoiceClick,
}) => {
  if (!question) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">
            {question.questionText}
          </h2>
          <Proposal
            choices={question.choices}
            correctAnswer={question.correctAnswer}
            showAnswer={showAnswer}
            onChoiceClick={handleChoiceClick}
          />
        </div>

        <div className="text-center">
          <motion.div
            className="text-xl font-semibold"
            animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {showAnswer ? (
              <span className="text-blue-500">
                Prochaine question dans {timeNextQuestion}s
              </span>
            ) : (
              <span className={`${timeLeft <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                Temps restant: {timeLeft}s
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Question;