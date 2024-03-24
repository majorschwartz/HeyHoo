import cv2
import base64
import requests
import json
import pyttsx3
import speech_recognition as sr

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Function to encode the image
def encode_image(image):
    _, img_encoded = cv2.imencode('.jpg', image)
    return base64.b64encode(img_encoded).decode('utf-8')

# Function to capture image from webcam
def capture_image():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()
    frame = cv2.flip(frame, 1)
    return frame

# Function to activate voice recognition and collect prompt
def activate_voice():
    r = sr.Recognizer()
    while True:
        with sr.Microphone() as source:
            print("Listening for activation...")
            audio = r.listen(source)
            try:
                command = r.recognize_google(audio).lower()
                print("Activation phrase detected:", command)
                if "hey who" in command:
                    print("Listening for prompt...")
                    audio = r.listen(source)
                    prompt = r.recognize_google(audio)
                    print("Prompt detected:", prompt)
                    return prompt
                elif "by who" in command:
                    return None
            except sr.UnknownValueError:
                pass
            except sr.RequestError as e:
                print("Could not request results from Google Speech Recognition service; {0}".format(e))


# Main loop
while True:
    # Activate voice and collect prompt
    prompt = activate_voice()
    if not prompt:
        break

    # Capture image from webcam
    image = capture_image()

    # Encode image to base64
    base64_image = encode_image(image)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt + "Explain in only 1-2 sentences." # Use the collected prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    response_data = response.json()

    # Extracting the content
    content = response_data['choices'][0]['message']['content']

    print("Response:", content)

    # Read out the response
    engine.say(content)
    engine.runAndWait()