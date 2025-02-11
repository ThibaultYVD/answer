import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Quiz {
  quiz_id: number;
  quiz_name: string;
}

const QuizzPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/auth/login';
  }

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/quiz', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuizzes(response.data.data);
      } catch (err) {
        setError('Failed to fetch quizzes');
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des Quizz</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.quiz_id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{quiz.quiz_name}</h2>
            <a href={`/quizz/${quiz.quiz_id}`} className="text-blue-500 hover:underline">
              Voir le quizz
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzPage;