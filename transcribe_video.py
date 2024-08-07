import moviepy.editor as mp
import speech_recognition as sr

# Step 1: Extract audio from the video file
video_path = "/Users/jasond/Downloads/Justin Welsh - The Content Operating System/03-The Full Content Operating System/01-Curating Quality Content with Twemex & Notion Saver.mp4"
audio_path = "audio.wav"

# Load the video file
video = mp.VideoFileClip(video_path)

# Extract audio from the video
video.audio.write_audiofile(audio_path)

# Step 2: Convert audio to text
# Initialize recognizer
recognizer = sr.Recognizer()

# Load the audio file
audio_file_path = audio_path
audio_file = sr.AudioFile(audio_file_path)

# Perform transcription
with audio_file as source:
    audio_data = recognizer.record(source)
    transcript = recognizer.recognize_google(audio_data)

# Display the transcript
print(transcript)

# Save the transcript to a file
with open("transcript.txt", "w") as file:
    file.write(transcript)
