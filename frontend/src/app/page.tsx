'use client';

import { useState } from 'react';
import FileUpload from './components/FileUpload';

export default function Home() {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="gradient-text text-4xl md:text-6xl font-bold mb-8 text-center">
          Video Transcription
        </h1>
        <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
          <FileUpload 
            onUpload={setTranscript}
            onProgress={setProgress}
          />
          
          {/* Progress Section */}
          {progress > 0 && progress < 100 && (
            <div className="mt-8">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2 text-center">Processing video... {progress}%</p>
            </div>
          )}

          {/* Results Section */}
          {transcript && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Transcript</h2>
              <div className="bg-gray-800 rounded-lg p-6 text-gray-300">
                <p className="whitespace-pre-wrap">{transcript}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
