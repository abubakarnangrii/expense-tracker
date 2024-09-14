// components/Error.tsx
'use client';

import React from 'react';

const Error: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="text-center p-6 bg-red-200 border border-red-300 rounded-lg">
        <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
        <p className="text-lg text-red-500">Something went wrong.</p>
        <p className="mt-4 text-sm text-gray-700">Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    </div>
  );
};

export default Error;
