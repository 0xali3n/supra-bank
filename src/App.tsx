// src/App.tsx
import React from "react";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center p-8 rounded-lg shadow-lg bg-opacity-80 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to My React App</h1>
        <p className="text-lg mb-6">
          This is a simple landing page built with React, Vite, TypeScript, and
          Tailwind CSS.
        </p>
        <a
          href="#"
          className="inline-block px-6 py-2 mt-4 bg-white text-indigo-500 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default App;
