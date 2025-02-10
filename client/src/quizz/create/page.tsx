import React, { useState } from "react";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

const CreateQuestionPage = () => {
  const [questions, setQuestions] = useState<
    { questionText: string; choices: string[]; correctAnswer: number }[]
  >([]);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [numChoices, setNumChoices] = useState(2);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleAddChoice = () => {
    if (choices.length < 4) {
      setChoices([...choices, ""]);
      setNumChoices(numChoices + 1);
    }
  };

  const handleRemoveChoice = () => {
    if (choices.length > 2) {
      setChoices(choices.slice(0, -1));
      setNumChoices(numChoices - 1);
    }
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleAddQuestion = () => {
    if (
      questionText.trim() === "" ||
      choices.some((choice) => choice.trim() === "")
    ) {
      alert("Veuillez remplir la question et toutes les propositions.");
      return;
    }
    setQuestions([...questions, { questionText, choices, correctAnswer }]);
    setQuestionText("");
    setChoices(["", ""]);
    setNumChoices(2);
    setCorrectAnswer(0);
  };

  const submitQuizz = async () => {
    if (questions.length === 0) {
      alert("Veuillez ajouter au moins une question.");
      return;
    }
    alert("Quizz créé avec succès");
    console.log(questions);
  }

  return (
    <div className="container mx-auto p-4">
      <Input 
        placeholder="Nom du quizz"
        extraClass="mb-6"
      />
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-semibold mb-2">
          Question:
        </label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-6">
        {choices.map((choice, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span
              onClick={() => setCorrectAnswer(index)}
              className="mr-2 cursor-pointer"
            >
              {correctAnswer === index ? "✔" : "✖"}
            </span>
            <label className="block text-gray-700 text-lg font-semibold mr-2">
              Choix {index + 1}:
            </label>
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
      <div className="mb-6 flex">
        <Button
          onClick={handleAddChoice}
          disabled={numChoices >= 4}
          extraClass="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter un choix
        </Button>
        <Button
          onClick={handleRemoveChoice}
          disabled={numChoices <= 2}
          extraClass="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
        >
          Supprimer un choix
        </Button>
      </div>
      <div className="mb-6">
        <Button
          onClick={handleAddQuestion}
          extraClass="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Ajouter la question
        </Button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Question
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Choix
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Réponse correcte
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold">
                  {q.questionText}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <ul className="list-decimal pl-5 text-gray-600">
                    {q.choices.map((choice, i) => (
                      <li key={i}>{choice}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-gray-600 font-semibold">
                  {q.choices[q.correctAnswer]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button 
      onClick={submitQuizz}
      extraClass="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Créer le quizz
      </Button>
    </div>
  );
};

export default CreateQuestionPage;
