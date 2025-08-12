
import google.generativeai as genai
from PIL import Image
import io
import base64
import os

# Set your Google Gemini API key directly here
GOOGLE_API_KEY = "your API KEY Here"
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash-latest')

def generate_metadata(description, base64_image_data):
    image_data = base64.b64decode(base64_image_data)
    image_part = {
        "mime_type": "image/png",
        "data": image_data
    }

    response = model.generate_content(
        [
            {
                "text": f"Give metadata for this image description:\n\n{description}",
            },
            image_part
        ]
    )

    return response.text.strip()
