import React, { useState } from "react";
import Button from '@components/ui/Button';
import Input from "@components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  questionText: string;
  choices: string[];
  correctAnswer: number;
}

interface QuizForm {
  title: string;
  questions: Question[];
}

const CreateQuestionPage = () => {
  const [quizForm, setQuizForm] = useState<QuizForm>({
    title: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    choices: ["", ""],
    correctAnswer: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const validateQuestion = (): boolean => {
    if (currentQuestion.questionText.trim() === "") {
      setError("La question ne peut pas être vide");
      return false;
    }
    if (currentQuestion.choices.some(choice => choice.trim() === "")) {
      setError("Tous les choix doivent être remplis");
      return false;
    }
    if (new Set(currentQuestion.choices).size !== currentQuestion.choices.length) {
      setError("Les choix doivent être uniques");
      return false;
    }
    setError(null);
    return true;
  };

  const handleAddChoice = () => {
    if (currentQuestion.choices.length < 4) {
      setCurrentQuestion(prev => ({
        ...prev,
        choices: [...prev.choices, ""],
      }));
    }
  };

  const handleRemoveChoice = () => {
    if (currentQuestion.choices.length > 2) {
      setCurrentQuestion(prev => ({
        ...prev,
        choices: prev.choices.slice(0, -1),
        correctAnswer: prev.correctAnswer >= prev.choices.length - 1 
          ? prev.choices.length - 2 
          : prev.correctAnswer,
      }));
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      choices: prev.choices.map((choice, i) => i === index ? value : choice),
    }));
  };

  const handleAddQuestion = () => {
    if (!validateQuestion()) return;

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
    }));
    setCurrentQuestion({
      questionText: "",
      choices: ["", ""],
      correctAnswer: 0,
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const submitQuiz = async () => {
    if (quizForm.title.trim() === "") {
      setError("Le titre du quiz ne peut pas être vide");
      return;
    }
    if (quizForm.questions.length === 0) {
      setError("Le quiz doit contenir au moins une question");
      return;
    }

    try {
      // Simulation d'une requête API
      console.log("Quiz soumis:", quizForm);
      setError(null);
      // Réinitialiser le formulaire après soumission
      setQuizForm({ title: "", questions: [] });
      alert("Quiz créé avec succès!");
    } catch (err) {
      setError("Erreur lors de la création du quiz");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Créer un nouveau quiz
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
          >
            {error}
          </motion.div>
        )}

        <Input 
          placeholder="Titre du quiz"
          value={quizForm.title}
          onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
          extraClass="mb-8"
        />

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Nouvelle question</h2>
          
          <Input
            placeholder="Question"
            value={currentQuestion.questionText}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, questionText: e.target.value }))}
            extraClass="mb-4"
          />

          <AnimatePresence>
            {currentQuestion.choices.map((choice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center mb-3"
              >
                <button
                  onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                  className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${
                    currentQuestion.correctAnswer === index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  ✓
                </button>
                <Input
                  placeholder={`Choix ${index + 1}`}
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  extraClass="flex-1"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleAddChoice}
              disabled={currentQuestion.choices.length >= 4}
              extraClass="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer text-white border-blue-500"
            >
              Ajouter un choix
            </Button>
            <Button
              onClick={handleRemoveChoice}
              disabled={currentQuestion.choices.length <= 2}
              extraClass="flex-1 bg-red-500 hover:bg-red-600 transition-colors cursor-pointer text-white border-red-500"
              variant="danger"
            >
              Supprimer un choix
            </Button>
          </div>

          <Button
            onClick={handleAddQuestion}
            extraClass="w-full mt-4 bg-green-500 hover:bg-green-600 transition-colors cursor-pointer text-white"
            variant="success"
          >
            Ajouter la question
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Questions ({quizForm.questions.length})</h2>
          <div className="space-y-4">
            {quizForm.questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{question.questionText}</h3>
                  <Button
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-500 hover:text-red-700 transition-colors font-bold text-xl cursor-pointer"
                  >
                    ×
                  </Button>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {question.choices.map((choice, i) => (
                    <li key={i} className={i === question.correctAnswer ? 'text-green-600 font-semibold' : ''}>
                      {choice}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          onClick={submitQuiz}
          extraClass="w-full mt-4 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer text-white border-blue-500"
          variant="primary"
          disabled={quizForm.questions.length === 0}
        >
          Créer le quiz
        </Button>
      </motion.div>
    </div>
  );
};

export default CreateQuestionPage;