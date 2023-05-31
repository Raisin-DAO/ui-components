import React from 'react';
import '../../index.css';

export interface ConfirmationModalProps {
  title: string;
  description: string;
  question: string;
  leftButton: string;
  rightButton: string;
  function: Function;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  question,
  leftButton,
  rightButton,
}) => {
  return (
    <div className="inset-0 z-10">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left border-solid border transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div>
            <div className="text-2xl font-semibold leading-6 text-gray-900 pb-2">{title}</div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{question}</p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              {leftButton}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 sm:col-start-2"
            >
              {rightButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
