import React, { useEffect, useState } from "react";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface Answer {
  answer_id: number | string;
  answer: string;
  isAnswer: boolean;
}

interface FormattedQuestion {
  question_id: number;
  question: string;
  answers: Answer[];
}

interface FormattedQuizData {
  quiz_name: string;
  questions: FormattedQuestion[];
}

interface Question {
  id: number;
  questionText: string;
  choices: string[];
  correctAnswer: number;
  answerIds: (number | string)[];
}

interface QuizForm {
  title: string;
  questions: Question[];
}

interface CurrentQuestion {
  questionText: string;
  choices: string[];
  correctAnswer: number;
}

const EditQuestionPage: React.FC = () => {
  const { token } = useAuth();
  const [quizForm, setQuizForm] = useState<QuizForm>({
    title: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    questionText: "",
    choices: ["", ""],
    correctAnswer: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(
          `http://localhost:3001/quiz/getQuizWithDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.quiz && response.data.quiz[0]) {
          const quizData = response.data.quiz[0];
          
          const uniqueQuestions = quizData.questions.map((q) => {
            const uniqueAnswersMap = new Map();
            q.answers.forEach((answer) => {
              if (!uniqueAnswersMap.has(answer.answer)) {
                uniqueAnswersMap.set(answer.answer, {
                  answer_id: answer.answer_id,
                  answer: answer.answer,
                  isAnswer: answer.isAnswer
                });
              }
            });
            const uniqueAnswers = Array.from(uniqueAnswersMap.values());

            return {
              id: q.question_id,
              questionText: q.question,
              choices: uniqueAnswers.map(a => a.answer),
              correctAnswer: uniqueAnswers.findIndex(a => a.isAnswer),
              answerIds: uniqueAnswers.map(a => a.answer_id)
            };
          });

          setQuizForm({
            title: quizData.name,
            questions: uniqueQuestions
          });
        } else {
          setError("Données du quiz non trouvées");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur lors de la récupération du quiz");
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuiz();
  }, [id, token]);

  const validateQuestion = (): boolean => {
    if (currentQuestion.questionText.trim() === "") {
      setError("La question ne peut pas être vide");
      return false;
    }
    if (currentQuestion.choices.some((choice) => choice.trim() === "")) {
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

  const validateQuiz = (): boolean => {
    if (quizForm.title.trim() === "") {
      setError("Le titre du quiz ne peut pas être vide");
      return false;
    }
    if (quizForm.questions.length === 0) {
      setError("Le quiz doit contenir au moins une question");
      return false;
    }
    return true;
  };

  const handleAddChoice = (): void => {
    if (currentQuestion.choices.length < 4) {
      setCurrentQuestion((prev) => ({
        ...prev,
        choices: [...prev.choices, ""],
      }));
    }
  };

  const handleRemoveChoice = (): void => {
    if (currentQuestion.choices.length > 2) {
      setCurrentQuestion((prev) => ({
        ...prev,
        choices: prev.choices.slice(0, -1),
        correctAnswer:
          prev.correctAnswer >= prev.choices.length - 1
            ? prev.choices.length - 2
            : prev.correctAnswer,
      }));
    }
  };

  const handleChoiceChange = (index: number, value: string): void => {
    setCurrentQuestion((prev) => ({
      ...prev,
      choices: prev.choices.map((choice, i) => (i === index ? value : choice)),
    }));
  };

  const handleAddQuestion = (): void => {
    if (!validateQuestion()) return;
  
    setQuizForm((prev) => {
      const newQuestionId = prev.questions.length + 1;
      const baseAnswerId = newQuestionId * 10; // Pour garder les IDs de réponses uniques par question
  
      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            id: newQuestionId,
            questionText: currentQuestion.questionText,
            choices: currentQuestion.choices,
            correctAnswer: currentQuestion.correctAnswer,
            answerIds: currentQuestion.choices.map((_, index) => baseAnswerId + index + 1)
          }
        ]
      };
    });
  
    setCurrentQuestion({
      questionText: "",
      choices: ["", ""],
      correctAnswer: 0
    });
  };

  const handleRemoveQuestion = (index: number): void => {
    setQuizForm(prev => {
      // Filtrer la question à supprimer
      const filteredQuestions = prev.questions.filter((_, i) => i !== index);
      
      // Réorganiser les IDs des questions et réponses restantes
      const updatedQuestions = filteredQuestions.map((question, newIndex) => {
        const newQuestionId = newIndex + 1;
        const newAnswerIds = question.choices.map((_, answerIndex) => 
          (newQuestionId * 10) + answerIndex + 1
        );
  
        return {
          ...question,
          id: newQuestionId,
          answerIds: newAnswerIds
        };
      });
  
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };


  const formatQuizData = (formData: QuizForm): FormattedQuizData => {
    return {
      quiz_name: formData.title,
      questions: formData.questions.map((question, questionIndex) => ({
        question_id: questionIndex + 1,  // Générer des IDs séquentiels pour les questions
        question: question.questionText,
        answers: question.choices.map((choice, answerIndex) => ({
          answer_id: (questionIndex * 10) + answerIndex + 1,  // Générer des IDs uniques pour les réponses
          answer: choice,
          isAnswer: answerIndex === question.correctAnswer
        }))
      }))
    };
  };

  const submitQuiz = async (): Promise<void> => {
    if (!validateQuiz()) return;

    try {
      const formattedData = formatQuizData(quizForm);
      console.log("Données envoyées:", JSON.stringify(formattedData, null, 2));

      const response = await axios.put(
        `http://localhost:3001/admin/edit/${id}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        navigate("/quizz");
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      setError("Erreur lors de la modification du quiz");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Modifier le quiz
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
          onChange={(e) =>
            setQuizForm((prev) => ({ ...prev, title: e.target.value }))
          }
          extraClass="mb-8"
        />

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Nouvelle question</h2>

          <Input
            placeholder="Question"
            value={currentQuestion.questionText}
            onChange={(e) =>
              setCurrentQuestion((prev) => ({
                ...prev,
                questionText: e.target.value,
              }))
            }
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
                  onClick={() =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      correctAnswer: index,
                    }))
                  }
                  className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${
                    currentQuestion.correctAnswer === index
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
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
          <h2 className="text-xl font-semibold mb-4">
            Questions ({quizForm.questions.length})
          </h2>
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
                  <button
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-500 hover:text-red-700 transition-colors font-bold text-xl"
                  >
                    ×
                  </button>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {question.choices.map((choice, i) => (
                    <li
                      key={i}
                      className={
                        i === question.correctAnswer
                          ? "text-green-600 font-semibold"
                          : ""
                      }
                    >
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
          extraClass={`w-full mt-4 transition-colors cursor-pointer text-white border-blue-500 ${
            quizForm.questions.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          variant="primary"
          disabled={quizForm.questions.length === 0}
        >
          Modifier le quiz
        </Button>
      </motion.div>
    </div>
  );
};

export default EditQuestionPage;