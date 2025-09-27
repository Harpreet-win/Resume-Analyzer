import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-pulse"></div>
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Analyzing your resume...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a few moments
        </p>
      </div>
    </div>
  );
};