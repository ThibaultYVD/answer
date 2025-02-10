import React, { useEffect, useState } from "react";
import Proposal from "@components/quizz/Proposal";

interface Question {
  questionText: string;
  choices: string[];
  correctAnswer: string;
}

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/quizz/[id]");
      // const data = await response.json();

      // Data for testing
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
        ],
      };
      setQuestions(data.questions);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (hasStarted && timeLeft === 0) {
      setShowAnswer(true);
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(30);
      }, 5000);
    }

    if (hasStarted && !showAnswer) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, showAnswer, hasStarted]);

  if (currentQuestionIndex >= questions.length) {
    return <div>Quizz terminé</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleChoiceClick = (choice: string) => {
    if (!showAnswer) {
      setShowAnswer(true);
      setTimeLeft(0);
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(30);
      }, 5000);
    }
  };

  const handleStartClick = () => {
    setHasStarted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Quizz</h1>
      {!hasStarted ? (
        <div className="text-center">
          <button
            onClick={handleStartClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {currentQuestion.questionText}
            </h2>
            <Proposal
              choices={currentQuestion.choices}
              correctAnswer={currentQuestion.correctAnswer}
              showAnswer={showAnswer}
              onChoiceClick={handleChoiceClick}
            />
          </div>
          <div className="text-center text-lg font-semibold">
            Temps restant: {timeLeft} secondes
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
