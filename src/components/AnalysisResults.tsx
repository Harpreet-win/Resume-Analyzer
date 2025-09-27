import React from 'react';
import { CheckCircle, XCircle, Lightbulb, Target } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getMatchBgColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-br from-emerald-50 to-green-100';
    if (score >= 60) return 'bg-gradient-to-br from-amber-50 to-yellow-100';
    return 'bg-gradient-to-br from-rose-50 to-red-100';
  };

  const getMatchRingColor = (score: number) => {
    if (score >= 80) return 'ring-emerald-200';
    if (score >= 60) return 'ring-amber-200';
    return 'ring-rose-200';
  };

  return (
    <div className="mt-10 space-y-8 relative">
      {/* Match Score */}
      <div className={`rounded-2xl p-8 ${getMatchBgColor(result.matchScore)} ring-1 ${getMatchRingColor(result.matchScore)} shadow-lg`}>
        <div className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
          <Target className={`h-10 w-10 ${getMatchColor(result.matchScore)} mr-4 relative z-10`} />
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Match Score</h3>
            <p className={`text-4xl font-bold ${getMatchColor(result.matchScore)}`}>
              {result.matchScore}%
            </p>
          </div>
        </div>
      </div>

      {/* Present Skills */}
      {result.presentSkills.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 ring-1 ring-emerald-200 shadow-lg">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-7 w-7 text-emerald-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Skills You Have</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {result.presentSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold shadow-sm ring-1 ring-emerald-200 hover:shadow-md transition-shadow duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {result.missingSkills.length > 0 && (
        <div className="bg-gradient-to-br from-rose-50 to-red-100 rounded-2xl p-8 ring-1 ring-rose-200 shadow-lg">
          <div className="flex items-center mb-6">
            <XCircle className="h-7 w-7 text-rose-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Skills to Highlight</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {result.missingSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-semibold shadow-sm ring-1 ring-rose-200 hover:shadow-md transition-shadow duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 ring-1 ring-indigo-200 shadow-lg">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-7 w-7 text-indigo-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Personalized Suggestions</h3>
        </div>
        <ul className="space-y-4">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start group">
              <span className="inline-block w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></span>
              <span className="text-gray-700 font-medium leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};