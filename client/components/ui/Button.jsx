import React from 'react';

const Button = ({ onClick, disabled, extraClass, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${extraClass} border border-[0.0625rem] border-[var(--button)] bg-[var(--button)] text-black text-center rounded-full flex justify-center items-center p-2 font-montserrat text-xs font-bold leading-[150%] no-underline transition-shadow duration-800`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;