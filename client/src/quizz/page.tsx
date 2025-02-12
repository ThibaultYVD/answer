// src/pages/QuizzPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@components/quizz/Card';
import { useAuth } from "@hooks/useAuth";


interface Quiz {
  quiz_id: number;
  quiz_name: string;
}

const QuizzPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin, token } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await axios.get('http://localhost:3001/quiz', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuizzes(response.data.data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des quiz');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [token]);

  return (
    <Card
      quizzes={quizzes}
      isLoading={isLoading}
      error={error}
      isAdmin={isAdmin}
    />
  );
};

export default QuizzPage;