import React from 'react';

const Input = ({
  type = 'text',
  extraClass,
  ...props
}) => {
  return (
    <input 
      type={type}
      className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${extraClass}`}
      {...props}
    />
  );
}

export default Input;