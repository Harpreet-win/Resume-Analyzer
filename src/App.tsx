import React, { useState } from 'react';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { ResumeInput } from './components/ResumeInput';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { AnalysisResults } from './components/AnalysisResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeResumeWithCohere } from './utils/cohereApi';
import { AnalysisResult } from './types';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState<string>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleResumeTextChange = (text: string) => {
    setResumeText(text);
    setFileName(undefined);
  };

  const handleFileUpload = (text: string, name: string) => {
    setResumeText(text);
    setFileName(name);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert('Please provide both resume text and job description');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeWithCohere(resumeText, jobDescription);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = resumeText.trim() && jobDescription.trim() && !isAnalyzing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50 py-12 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
            Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Discover how perfectly your resume aligns with your dream job and get personalized insights to stand out
          </p>
        </div>

        {/* Setup Instructions Link */}
        <div className="text-center mb-6">
          <a 
            href="/setup-instructions.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 border border-white/30"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Setup Instructions
          </a>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-10 relative">
          {/* Card decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Input */}
            <div>
              <ResumeInput
                resumeText={resumeText}
                onResumeTextChange={handleResumeTextChange}
                fileName={fileName}
              />
            </div>

            {/* Job Description Input */}
            <div>
              <JobDescriptionInput
                jobDescription={jobDescription}
                onJobDescriptionChange={setJobDescription}
              />
            </div>
          </div>

          {/* Analyze Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className={`inline-flex items-center px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl relative overflow-hidden group ${
                canAnalyze
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canAnalyze && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              <Search className="h-6 w-6 mr-2" />
              <span className="relative">Analyze My Resume</span>
            </button>
          </div>

          {/* Loading State */}
          {isAnalyzing && <LoadingSpinner />}

          {/* Results */}
          {analysisResult && !isAnalyzing && (
            <AnalysisResults result={analysisResult} />
          )}
        </div>

        {/* API Key Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-white/30">
            ✨ This demo uses mock data. Add your Cohere API key to .env file for real analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;