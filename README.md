# Resume Match Analyzer

A React application that analyzes how well your resume matches a job description using AI-powered text analysis with Cohere.

## Features

- Upload PDF or TXT resume files
- Paste job descriptions
- AI-powered analysis using Cohere API
- Skills matching and suggestions
- Match score percentage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cohere API key (optional, for real analysis)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd resume-match-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Cohere API key:
   ```env
   VITE_COHERE_API_KEY=your-cohere-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Usage

1. Upload your resume (PDF or TXT) or paste the text directly
2. Paste the job description you're applying for
3. Click "Analyze My Resume" to get your match analysis
4. Review the match score, present skills, missing skills, and improvement suggestions

## How It Works

The application uses Cohere's AI models to:
1. Extract embeddings from both your resume and the job description
2. Calculate cosine similarity to determine match score
3. Extract required skills from the job description
4. Identify which skills are present in your resume and which are missing
5. Generate personalized suggestions to improve your resume match

## Security

The Cohere API key is stored in the `.env` file, which is excluded from the repository via `.gitignore`. This ensures your API key is never exposed in the codebase.

## Demo Mode

If no API key is provided, the application will run in demo mode with mock data to showcase functionality.

## Technologies Used

- React with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Cohere AI API
- pdf-parse (PDF text extraction)

## Deployment

You can deploy the built application (from the `dist` folder after running `npm run build`) to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request