import React, { useEffect, useState, useCallback } from "react";
import Question from "@components/quizz/Question";
import { motion } from "framer-motion";

interface Question {
  questionText: string;
  choices: string[];
  correctAnswer: string;
}

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeNextQuestion, setTimeNextQuestion] = useState(5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/quizz/[id]");
        const data = {
          questions: [
            {
              questionText: "Quelle est la capitale de la France ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Paris",
            },
            {
              questionText: "Quelle est la capitale de l'Espagne ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Madrid",
            },
            {
              questionText: "Quelle est la capitale de l'Allemagne ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Berlin",
            },
            {
              questionText: "Quelle est la capitale de la France ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Paris",
            },
            {
              questionText: "Quelle est la capitale de l'Espagne ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Madrid",
            },
            {
              questionText: "Quelle est la capitale de l'Allemagne ?",
              choices: ["Paris", "Londres", "Berlin", "Madrid"],
              correctAnswer: "Berlin",
            },
          ],
        };
        setQuestions(data.questions);
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
      }
    };

    fetchQuestions();
  }, []);

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
    let timeoutId: NodeJS.Timeout;

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

  const handleChoiceClick = useCallback((choice: string) => {
    if (!showAnswer) {
      if (choice === questions[currentQuestionIndex].correctAnswer) {
        setScore(prev => prev + Math.ceil(timeLeft / 3));
      }
      setShowAnswer(true);
      setTimeLeft(0);
      startNextQuestionTimer();
    }
  }, [questions, currentQuestionIndex, timeLeft, showAnswer, startNextQuestionTimer]);

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
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
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