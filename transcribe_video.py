import moviepy.editor as mp
import speech_recognition as sr

# Correct file path
video_path = r"/Users/jasond/Downloads/User Validation Research - 2024_11_18 13_59 EST - Recording.mp4"
audio_path = "audio.wav"

# Step 1: Extract audio from the video file
video = mp.VideoFileClip(video_path)

# Extract audio from the video
video.audio.write_audiofile(audio_path)

# Step 2: Convert audio to text in chunks
# Initialize recognizer
recognizer = sr.Recognizer()

# Load the audio file
audio_file_path = audio_path
chunk_duration = 60  # Process 60 seconds at a time
offset = 0
transcript = ""

while offset < video.audio.duration:
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source, offset=offset, duration=chunk_duration)
        try:
            # Perform transcription for the current chunk
            chunk_transcript = recognizer.recognize_google(audio_data)
            transcript += chunk_transcript + " "
        except sr.RequestError as e:
            print(f"Error recognizing chunk at offset {offset}: {e}")
            break
        offset += chunk_duration

# Display the transcript
print(transcript)

# Save the transcript to a file
with open("transcript.txt", "w") as file:
    file.write(transcript)

