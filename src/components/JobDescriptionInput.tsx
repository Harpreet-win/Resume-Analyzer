import React from 'react';

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (text: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onJobDescriptionChange
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold bg-gradient-to-r from-gray-700 to-pink-600 bg-clip-text text-transparent mb-4">
        Job Description
      </label>
      <textarea
        value={jobDescription}
        onChange={(e) => onJobDescriptionChange(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full h-48 px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none shadow-sm bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
      />
    </div>
  );
};