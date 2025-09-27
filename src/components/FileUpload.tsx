import React, { useCallback } from 'react';
import { Upload, File } from 'lucide-react';
import { extractTextFromFile } from '../utils/fileHandler';

interface FileUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  onError: (error: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onTextExtracted, onError }) => {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractTextFromFile(file);
      onTextExtracted(text, file.name);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process file');
    }
  }, [onTextExtracted, onError]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const file = files[0];
    
    if (file) {
      try {
        const text = await extractTextFromFile(file);
        onTextExtracted(text, file.name);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to process file');
      }
    }
  }, [onTextExtracted, onError]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold bg-gradient-to-r from-gray-700 to-purple-600 bg-clip-text text-transparent mb-4">
        Resume Upload
      </label>
      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 transition-all duration-300 bg-gradient-to-br from-white/50 to-purple-50/30 backdrop-blur-sm hover:shadow-lg group"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4 group-hover:text-purple-500 transition-colors duration-200" />
        <p className="text-gray-600 mb-2 font-medium">Drop your resume here or click to browse</p>
        <p className="text-sm text-gray-500 mb-4">Supports PDF and TXT files up to 10MB</p>
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 bg-white/80 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-md cursor-pointer transition-all duration-200 backdrop-blur-sm"
        >
          <File className="h-4 w-4 mr-2" />
          Choose File
        </label>
      </div>
    </div>
  );
};