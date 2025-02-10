import React from 'react';

const Proposal = ({ choices, correctAnswer, showAnswer, onChoiceClick }) => {
  return (
    <div>
      {choices.map((choice, index) => (
        <div key={index} className="mb-2">
          <span
            onClick={() => onChoiceClick(choice)}
            className={`block p-2 border rounded cursor-pointer ${
              showAnswer
                ? choice === correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {choice}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Proposal;