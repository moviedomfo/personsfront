import React from 'react';

export interface ITextBox {
  text: string;
  onChange: (text: string) => void;
  placeholder: string;
  label?: string;
  id: string;
  type: 'tel' | 'text' | 'date' | 'checkbox' | 'number' | 'password';
}
const TextBox = (props: ITextBox) => {
  const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setText(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <>
      <label
        htmlFor={props.id}
        className='block mb-2 text-sm font-medium
        
         text-gray-900 dark:text-white'
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        className='bg-gray-50 
        rounded border-2
        bg-transparent 
         border-gray-300 text-gray-900 text-sm 
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={props.placeholder}
        required
        onChange={onChangeHandle}
        value={props.text}
      />
    </>
  );
};

export default TextBox;
