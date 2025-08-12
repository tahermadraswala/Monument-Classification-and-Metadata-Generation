from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from gemini_utils import generate_metadata
import shutil
import os
import base64
import traceback

app = FastAPI()

# --- This section has been updated ---
origins = [
    "http://localhost:3000",  # Added this line to fix the CORS error
    "http://localhost:3001",
    "http://localhost:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------------

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Monument Metadata Generation API using Gemini 2.0 Flash"}


@app.post("/generate_metadata/")
async def generate_monument_metadata(
    file: UploadFile = File(...),
    description: str = Form(...)
):
    try:
        # Read file bytes
        file_bytes = await file.read()
        # Encode image to base64
        base64_image = base64.b64encode(file_bytes).decode('utf-8')
        # Call Gemini to generate metadata
        metadata = generate_metadata(description, base64_image)
        return JSONResponse(content={"metadata": metadata})
    # --- This block includes debugging prints ---
    except Exception as e:
        print(f"An error occurred: {e}")  # Prints a simple error message
        traceback.print_exc()            # Prints the full, detailed traceback
        return JSONResponse(content={"error": "An internal server error occurred."}, status_code=500)
    # ----------------------------------------