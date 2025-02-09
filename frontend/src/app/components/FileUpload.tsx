'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onUpload: (transcript: string) => void;
  onProgress: (progress: number) => void;
  onStart: () => void;
}

export default function FileUpload({ onUpload, onProgress, onStart }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);
    setError(null);
    onStart();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      onUpload(data.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      onProgress(0);
    } finally {
      setIsUploading(false);
    }
  }, [onUpload, onProgress, onStart]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv']
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024 // 100MB max file size
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-300 
        ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-purple-500'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="text-4xl mb-4">📁</div>
        <h3 className="text-xl font-semibold text-gray-200">
          {isDragActive
            ? 'Drop the video here'
            : 'Drop your video file here'}
        </h3>
        <p className="text-gray-400">
          {isUploading
            ? 'Uploading...'
            : 'or click to select a file to transcribe'}
        </p>
        <p className="text-gray-500 text-sm">Maximum file size: 100MB</p>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
} 