import { useEffect } from "react";
import React from "react";

function Notification({ close }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close(); // call the function
    }, 3000);
    return () => clearTimeout(timer);
  }, [close]);
  return (
    <div className="fixed right-2 flex w-50 h-20 ">
      <div className="space-y-2 p-4">
        <div
          role="alert"
          className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
        >
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
          <p className="text-xs font-semibold">Success - Item Added to Cart!</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
