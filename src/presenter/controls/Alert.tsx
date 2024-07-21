import React from 'react';
import { text } from 'stream/consumers';

export interface IAlert {
  preText: string;
  text: string;

  id?: string;
  //type: 'tel' | 'text' | 'date' | 'checkbox' | 'number' | 'password';
}
const Alert = (props: IAlert) => {
  return (
    <div
      className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
      role='alert'
    >
      <span className='font-medium'>{props.preText}</span> {props.text}
    </div>
  );
};

export default Alert;
