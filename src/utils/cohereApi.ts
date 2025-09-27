import { AnalysisResult } from '../types';

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
const COHERE_API_URL = 'https://api.cohere.ai';

export const analyzeResumeWithCohere = async (
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> => {
  if (!COHERE_API_KEY) {
    // Return mock data for demo purposes
    return getMockAnalysisResult(resumeText, jobDescription);
  }

  try {
    // Get embeddings for both texts
    const [resumeEmbedding, jobEmbedding] = await Promise.all([
      getEmbedding(resumeText),
      getEmbedding(jobDescription)
    ]);

    // Calculate cosine similarity
    const matchScore = calculateCosineSimilarity(resumeEmbedding, jobEmbedding);

    // Extract skills from job description using Cohere
    const requiredSkills = await extractSkillsFromJobDescription(jobDescription);
    
    // Find present and missing skills
    const presentSkills = findPresentSkills(resumeText, requiredSkills);
    const missingSkills = requiredSkills.filter(skill => 
      !presentSkills.some(present => present.toLowerCase() === skill.toLowerCase())
    );

    // Generate enhanced suggestions using Cohere
    const suggestions = await generateEnhancedSuggestions(resumeText, jobDescription, presentSkills, missingSkills, matchScore);

    return {
      matchScore: Math.round(matchScore * 100),
      presentSkills,
      missingSkills,
      suggestions
    };
  } catch (error) {
    console.error('Cohere API error:', error);
    return getMockAnalysisResult(resumeText, jobDescription);
  }
};

const getEmbedding = async (text: string): Promise<number[]> => {
  const response = await fetch(`${COHERE_API_URL}/v1/embed`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      texts: [text],
      model: 'embed-english-v3.0',
      input_type: 'search_document'
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get embedding from Cohere');
  }

  const data = await response.json();
  return data.embeddings[0];
};

const calculateCosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

const extractSkillsFromJobDescription = async (jobDescription: string): Promise<string[]> => {
  // Use Cohere to extract skills from job description
  try {
    const response = await fetch(`${COHERE_API_URL}/v1/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Extract a list of technical skills and qualifications required from this job description. Return only the skills as a comma-separated list: ${jobDescription}`,
        model: 'command-r-plus',
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to extract skills from Cohere');
    }

    const data = await response.json();
    const skillsText = data.text;
    return skillsText.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  } catch (error) {
    console.error('Skill extraction error, falling back to basic method:', error);
    // Fallback to basic skill extraction
    const commonSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker',
      'Git', 'SQL', 'MongoDB', 'Express', 'Vue.js', 'Angular', 'Java', 'C++',
      'Machine Learning', 'Data Analysis', 'Project Management', 'Agile', 'Scrum',
      'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'CSS', 'HTML'
    ];

    return commonSkills.filter(skill => 
      jobDescription.toLowerCase().includes(skill.toLowerCase())
    );
  }
};

const findPresentSkills = (resumeText: string, requiredSkills: string[]): string[] => {
  return requiredSkills.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );
};

const generateEnhancedSuggestions = async (
  resumeText: string,
  jobDescription: string,
  presentSkills: string[],
  missingSkills: string[],
  matchScore: number
): Promise<string[]> => {
  // Use Cohere to generate personalized suggestions
  try {
    const response = await fetch(`${COHERE_API_URL}/v1/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Based on this resume and job description, provide 3 specific suggestions to improve the resume match. Consider the match score of ${matchScore}, present skills: ${presentSkills.join(', ')}, and missing skills: ${missingSkills.join(', ')}. Return only the 3 suggestions as a numbered list.`,
        model: 'command-r-plus',
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate suggestions from Cohere');
    }

    const data = await response.json();
    const suggestionsText = data.text;
    
    // Parse the numbered list
    const suggestions = suggestionsText
      .split('\n')
      .filter(line => /^\d+\.\s*/.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());
    
    return suggestions.slice(0, 3);
  } catch (error) {
    console.error('Suggestion generation error, falling back to basic method:', error);
    // Fallback to basic suggestion generation
    return generateBasicSuggestions(presentSkills, missingSkills, matchScore);
  }
};

const generateBasicSuggestions = (
  presentSkills: string[],
  missingSkills: string[],
  matchScore: number
): string[] => {
  const suggestions: string[] = [];

  if (matchScore < 0.5) {
    suggestions.push('Consider tailoring your resume more closely to this specific job description');
  }

  if (missingSkills.length > 0) {
    suggestions.push(`Highlight experience with ${missingSkills.slice(0, 3).join(', ')} if you have it`);
  }

  if (presentSkills.length > 0) {
    suggestions.push('Consider adding specific examples or projects showcasing your skills');
  }

  suggestions.push('Use more industry-specific keywords and terminology');

  return suggestions.slice(0, 3);
};

const getMockAnalysisResult = (resumeText: string, jobDescription: string): AnalysisResult => {
  // Mock analysis for demo purposes
  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git', 'SQL'];
  const presentSkills = skills.filter(skill => 
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );
  const jobSkills = skills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
  const missingSkills = jobSkills.filter(skill => !presentSkills.includes(skill));
  
  const matchScore = Math.round((presentSkills.length / Math.max(jobSkills.length, 1)) * 100);

  return {
    matchScore,
    presentSkills,
    missingSkills,
    suggestions: [
      'Add more specific examples of your technical projects',
      'Include quantifiable achievements and metrics',
      'Tailor your experience to match the job requirements'
    ]
  };
};