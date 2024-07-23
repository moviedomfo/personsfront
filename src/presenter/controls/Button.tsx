import React, { ReactNode } from 'react';
export interface IButton {
  onClick: () => void;
  children: ReactNode;
  disable:boolean;
  id?: string;
  // type: 'tel' | 'text' | 'date' | 'checkbox' | 'number' | 'password';
}
const Button = (props: IButton) => {
  return (
    <div className=''>
      <button
        disabled={props.disable}
        type='button'
        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium
         text-gray-900 
         focus:outline-none 
         bg-white 
         rounded-lg 
         border
          border-gray-200 
          hover:bg-gray-100 
          hover:text-blue-700 
          focus:z-10 focus:ring-4 
          focus:ring-gray-100
          dark:focus:ring-gray-700
          dark:bg-gray-800
          dark:text-gray-400
          dark:border-gray-600
          dark:hover:text-white 
          dark:hover:bg-gray-700'
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
