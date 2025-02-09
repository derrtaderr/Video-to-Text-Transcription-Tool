# Video Transcription Tool

A modern web application that converts video files to text transcripts using speech recognition. Built with Next.js for the frontend and Python FastAPI for the backend.

## Features

- 🎥 Video to text transcription
- 🎨 Modern dark theme UI with gradient accents
- 📱 Responsive design
- ⚡ Real-time progress tracking
- 📝 Automatic paragraph formatting
- ⬇️ Download transcripts as text files
- 🔄 Drag and drop file upload
- ⚠️ Error handling and file size validation

## Tech Stack

- **Frontend:**
  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - React Dropzone

- **Backend:**
  - Python FastAPI
  - MoviePy
  - SpeechRecognition
  - Google Speech Recognition API

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/derrtaderr/Video-to-Text-Transcription-Tool.git
cd Video-to-Text-Transcription-Tool
```

2. Install Python dependencies:
```bash
pip install fastapi uvicorn python-multipart moviepy SpeechRecognition
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the Python backend server:
```bash
# From the root directory
python server.py
```

2. Start the Next.js frontend development server:
```bash
# From the frontend directory
cd frontend
npm run dev
```

3. Open your browser and visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Usage

1. Open the application in your browser
2. Drag and drop a video file or click to select one
3. Wait for the transcription process to complete
4. View the formatted transcript
5. Download the transcript as a text file if needed

## Limitations

- Maximum file size: 100MB
- Supported video formats: MP4, AVI, MOV, MKV
- Requires internet connection for Google Speech Recognition
- Audio must be clear for accurate transcription

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.