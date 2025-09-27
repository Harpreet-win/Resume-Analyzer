import * as pdfjsLib from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';

// Dynamically import the worker
const initPdfWorker = async () => {
  const worker = await import('pdfjs-dist/build/pdf.worker?url');
  pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    } else if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          await initPdfWorker();
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const text = await extractTextFromPDF(arrayBuffer);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file format. Please use PDF or TXT files.'));
    }
  });
};

const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  try {
    // Load the PDF document
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    let textContent = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      const pageText = text.items
        .map((item: any) => item.str)
        .join(' ');
      textContent += pageText + '\n';
    }
    
    return textContent;
  } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + (error as Error).message);
  }
};