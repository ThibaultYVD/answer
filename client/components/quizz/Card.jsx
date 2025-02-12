import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, isAdmin }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6 space-y-4">
        <div className="h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center px-4">
            {quiz.quiz_name}
          </h2>
        </div>
        <div className="flex justify-between flex-wrap gap-4 items-center">
          <Link
            to={`/quizz/${quiz.quiz_id}`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
          >
            Commencer le quiz
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          {isAdmin && (
            <Link to={`/quizz/${quiz.quiz_id}/edit`}>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium">
                Modifier
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          )}
          <span className="text-sm text-gray-500">Quiz #{quiz.quiz_id}</span>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="h-40 bg-gray-200 rounded-lg"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const Card = ({ quizzes, isLoading, error, isAdmin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Liste des Quiz
          </h1>
          <p className="text-gray-500 text-lg">
            Choisissez un quiz pour commencer
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6)
              .fill(null)
              .map((_, index) => <LoadingSkeleton key={index} />)
          ) : quizzes.length > 0 ? (
            quizzes.map((quiz) => <QuizCard key={quiz.quiz_id} quiz={quiz} isAdmin={isAdmin} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun quiz disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
