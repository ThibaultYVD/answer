import React, { useEffect, useState, useCallback } from "react";
import Question from "@components/quizz/Question";
import { motion } from "framer-motion";
import axios from "axios";

import { useParams } from 'react-router-dom';

const Page = () => {
  const { id } = useParams(); // Utiliser useParams au lieu de props.params
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeNextQuestion, setTimeNextQuestion] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3001/quiz/getQuizWithDetails/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.data && response.data.quiz && response.data.quiz[0]) {
          const formattedQuestions = response.data.quiz[0].questions.map(q => ({
            questionText: q.question,
            choices: q.answers.map(a => a.answer),
            correctAnswer: q.answers.find(a => a.isAnswer)?.answer || ''
          }));
          
          setQuestions(formattedQuestions);
        } else {
          setError("Données du quiz non trouvées");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
        setError("Erreur lors du chargement des questions");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchQuestions();
    }
  }, [id]);

  const goToNextQuestion = useCallback(() => {
    setShowAnswer(false);
    setCurrentQuestionIndex(prev => prev + 1);
    setTimeLeft(30);
    setTimeNextQuestion(5);
  }, []);

  const startNextQuestionTimer = useCallback(() => {
    let remainingTime = 5;
    const updateTimer = () => {
      remainingTime -= 1;
      setTimeNextQuestion(remainingTime);
      
      if (remainingTime > 0) {
        setTimeout(updateTimer, 1000);
      } else {
        goToNextQuestion();
      }
    };
    
    setTimeout(updateTimer, 1000);
  }, [goToNextQuestion]);

  const handleTimeUp = useCallback(() => {
    if (!showAnswer) {
      setShowAnswer(true);
      setTimeLeft(0);
      startNextQuestionTimer();
    }
  }, [showAnswer, startNextQuestionTimer]);

  useEffect(() => {
    let timeoutId;

    if (hasStarted && !showAnswer && timeLeft > 0) {
      timeoutId = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeLeft, hasStarted, showAnswer, handleTimeUp]);

  const handleChoiceClick = useCallback((choice) => {
    if (!showAnswer && questions[currentQuestionIndex]) {
      if (choice === questions[currentQuestionIndex].correctAnswer) {
        setScore(prev => prev + Math.ceil(timeLeft / 3));
      }
      setShowAnswer(true);
      setTimeLeft(0);
      startNextQuestionTimer();
    }
  }, [questions, currentQuestionIndex, timeLeft, showAnswer, startNextQuestionTimer]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Aucune question trouvée</h2>
          <p>Ce quiz ne contient pas de questions.</p>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Quizz terminé!</h2>
        <p className="text-2xl mb-4">Score final: {score} points</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Rejouer
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
          Quiz Challenge
        </h1>

        {!hasStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl mb-6">Prêt à commencer le quiz ?</h2>
            <button
              onClick={() => setHasStarted(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Commencer
            </button>
          </motion.div>
        ) : (
          <Question
            question={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            score={score}
            showAnswer={showAnswer}
            timeLeft={timeLeft}
            timeNextQuestion={timeNextQuestion}
            handleChoiceClick={handleChoiceClick}
          />
        )}
      </div>
    </div>
  );
};

export default Page;