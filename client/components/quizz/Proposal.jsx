import React from "react";
import { motion } from "framer-motion";

const Proposal = ({ choices, correctAnswer, showAnswer, onChoiceClick }) => {
  if (!choices || !Array.isArray(choices)) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {choices.map((choice, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: showAnswer ? 1 : 1.02 }}
          whileTap={{ scale: showAnswer ? 1 : 0.98 }}
          onClick={() => onChoiceClick(choice)}
          className={`p-4 rounded-lg text-lg font-medium transition-colors ${
            showAnswer
              ? choice === correctAnswer
                ? "bg-green-500 text-white"
                : "bg-red-100 text-gray-500"
              : "bg-white border-2 border-blue-200 hover:border-blue-400 text-gray-700"
          }`}
          disabled={showAnswer}
        >
          {choice}
        </motion.button>
      ))}
    </div>
  );
};

export default Proposal;