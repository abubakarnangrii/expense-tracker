// components/Loader.tsx
'use client';

import React from 'react';

// Add custom CSS directly in your component or via a CSS/SCSS file if you prefer
const loaderStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1); /* Light border */
    border-left-color: #7F57F1; /* Color of the spinner */
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: spin 1s linear infinite;
  }
`;

const Loader: React.FC = () => {
  return (
    <div>
      <style>{loaderStyles}</style>
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
        <p className="text-primary text-lg ml-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
