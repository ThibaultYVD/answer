import React from 'react';

const Button = ({ onClick, disabled, extraClass, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${extraClass}
        bg-gradient-to-r from-blue-500 to-indigo-600 
        hover:from-blue-600 hover:to-indigo-700
        text-white
        rounded-lg
        flex justify-center items-center
        px-4 py-2
        font-medium text-sm
        shadow-sm hover:shadow-md
        transform transition-all duration-300
        hover:-translate-y-0.5 active:translate-y-0
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:translate-y-0
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;