export interface AnalysisResult {
  matchScore: number;
  presentSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export interface ResumeData {
  text: string;
  fileName?: string;
}

export interface JobDescription {
  text: string;
}