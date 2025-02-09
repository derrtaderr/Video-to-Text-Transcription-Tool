from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import moviepy.editor as mp
import speech_recognition as sr
import os
from pathlib import Path
import shutil
import re

app = FastAPI()

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def format_transcript(text: str) -> str:
    # Split into sentences
    sentences = re.split('([.!?]+)', text)
    formatted_text = ""
    current_paragraph = ""
    
    for i in range(0, len(sentences)-1, 2):
        sentence = sentences[i].strip()
        punctuation = sentences[i+1] if i+1 < len(sentences) else "."
        
        if sentence:
            current_paragraph += sentence + punctuation + " "
            
            # Start new paragraph every 3-4 sentences or on certain keywords
            if (i % 6 == 4) or any(kw in sentence.lower() for kw in ["however", "therefore", "in conclusion", "moreover"]):
                formatted_text += current_paragraph.strip() + "\n\n"
                current_paragraph = ""
    
    if current_paragraph:
        formatted_text += current_paragraph.strip()
    
    return formatted_text

@app.post("/api/transcribe")
async def transcribe_video(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        file_path = UPLOAD_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract audio
        video = mp.VideoFileClip(str(file_path))
        audio_path = UPLOAD_DIR / "temp_audio.wav"
        video.audio.write_audiofile(str(audio_path))

        # Initialize recognizer
        recognizer = sr.Recognizer()
        transcript = ""
        total_duration = video.audio.duration
        
        # Process audio in chunks
        with sr.AudioFile(str(audio_path)) as source:
            chunk_duration = 60
            offset = 0
            
            while offset < total_duration:
                audio_data = recognizer.record(source, offset=offset, duration=chunk_duration)
                try:
                    chunk_transcript = recognizer.recognize_google(audio_data)
                    transcript += chunk_transcript + " "
                except sr.RequestError as e:
                    return {"error": f"API error: {str(e)}"}
                except sr.UnknownValueError:
                    # Skip chunks that couldn't be transcribed
                    pass
                
                progress = min(100, int((offset + chunk_duration) / total_duration * 100))
                print(f"Progress: {progress}%")  # For server-side logging
                offset += chunk_duration

        # Format the transcript
        formatted_transcript = format_transcript(transcript.strip())

        # Cleanup
        video.close()
        os.remove(file_path)
        os.remove(audio_path)

        return {
            "success": True,
            "transcript": formatted_transcript,
            "progress": 100
        }

    except Exception as e:
        return {"error": f"Transcription failed: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 