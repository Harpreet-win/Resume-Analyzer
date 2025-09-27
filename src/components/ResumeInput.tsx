import React from 'react';
import { FileUpload } from './FileUpload';

interface ResumeInputProps {
  resumeText: string;
  onResumeTextChange: (text: string) => void;
  fileName?: string;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({
  resumeText,
  onResumeTextChange,
  fileName
}) => {
  const handleTextExtracted = (text: string, name: string) => {
    onResumeTextChange(text);
  };

  const handleError = (error: string) => {
    console.error('File upload error:', error);
    // You could show a toast notification here
  };

  return (
    <div className="space-y-6 relative">
      <FileUpload onTextExtracted={handleTextExtracted} onError={handleError} />
      
      <div>
        <label className="block text-sm font-semibold bg-gradient-to-r from-gray-700 to-purple-600 bg-clip-text text-transparent mb-4">
          Or Paste Resume Text
          {fileName && (
            <span className="ml-2 text-sm font-normal text-emerald-600">
              ({fileName} uploaded)
            </span>
          )}
        </label>
        <textarea
          value={resumeText}
          onChange={(e) => onResumeTextChange(e.target.value)}
          placeholder="Paste your resume text here..."
          className="w-full h-48 px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none shadow-sm bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md placeholder-gray-400"
        />
      </div>
    </div>
  );
};