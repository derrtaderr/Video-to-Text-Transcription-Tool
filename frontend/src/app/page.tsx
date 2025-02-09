'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';
import TranscriptDisplay from './components/TranscriptDisplay';

export default function Home() {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadStart = () => {
    setIsProcessing(true);
    setProgress(0);
    setTranscript(null);
  };

  const handleUploadComplete = (text: string) => {
    setTranscript(text);
    setProgress(100);
    setIsProcessing(false);
  };

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="gradient-text text-4xl md:text-6xl font-bold mb-8 text-center">
          Video Transcription
        </h1>
        <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
          <FileUpload 
            onUpload={handleUploadComplete}
            onProgress={setProgress}
            onStart={handleUploadStart}
          />
          
          {/* Progress Section */}
          {isProcessing && (
            <div className="mt-8">
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    width: `${progress}%`,
                    transition: 'width 0.5s ease-out'
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-gray-400 text-sm mt-2">
                <span>Processing video...</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && <TranscriptDisplay transcript={transcript} />}
        </div>
      </div>
    </main>
  );
}
