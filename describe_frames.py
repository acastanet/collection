import os
import google.generativeai as genai
import sys

genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro-latest')

def describe_frame(filename):
    print(f"Describing {filename}...")
    sample_file = genai.upload_file(path=filename)
    response = model.generate_content([sample_file, "Describe what you see in this image in extreme detail. If it is a mathematical animation, describe the shape, the motion (if apparent), any text, labels, equations, code, or context. Extract all text accurately."])
    print(response.text)

describe_frame("frame_002.jpg")
describe_frame("frame_005.jpg")
describe_frame("frame_011.jpg")
