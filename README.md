# Monument Classification and Metadata Generation

## Project Overview

Monument Classification and Metadata Generation is a full-stack web application that automates the identification of monuments in images and generates rich metadata about them. The system leverages generative AI for intelligent annotation and aims to provide accessible monument information for researchers, educators, and cultural heritage enthusiasts.

The repository is built using a modern stack:  
- **Frontend**: React (JavaScript), styled with CSS, enhanced with a visually engaging and responsive interface.  
- **Backend**: FastAPI (Python), integrates Google Gemini (Generative AI) for metadata generation.

**Language breakdown:**  
- HTML: 41.5%  
- JavaScript: 31.9%  
- Python: 16.4%  
- CSS: 10.2%  

---

## Repository Structure

```
Monument-Classification-and-Metadata-Generation/
├── backend/
│   ├── .gitignore
│   ├── gemini_utils.py
│   ├── main.py
│   ├── prompt_templates.txt
│   └── requirements.txt
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Technology Stack

| Layer      | Technology                           | Key Features                                                   |
|------------|--------------------------------------|---------------------------------------------------------------|
| Frontend   | React, JavaScript, HTML, CSS         | Responsive UI, drag-and-drop image upload, dark mode support  |
| Backend    | FastAPI (Python), Google Gemini API  | RESTful API, generative monument metadata, CORS support       |
| Utilities  | Pillow, python-dotenv, Axios         | Image preprocessing, environment management, HTTP requests    |

---

## Core Functionality

### 1. Monument Image Upload & Preview

- Users can easily upload monument images via drag-and-drop or file selector.
- The interface provides instant image previews and supports dark/light mode toggling.

### 2. Metadata Prompt & Generation (AI-driven)

- The user provides a brief description along with the image.
- The backend combines user input and image with a carefully crafted prompt:
    ```
    You are an expert in history and cultural heritage. Please generate detailed metadata for the uploaded monument image including:
    - Monument name (if known)
    - Location (if identifiable)
    - Architectural style
    - Historical significance
    - Estimated era or year of construction
    - Any notable features
    ```
- The metadata is generated using Google Gemini's generative AI capabilities (`gemini_utils.py`).

### 3. REST API (FastAPI, Python)

- **`POST /generate_metadata/`**: Accepts an image file and description; responds with annotated metadata and error handling.
- Integrated robust CORS middleware for frontend/backend communication (outside localhost scenario possible).

### 4. Downloadable Results

- Users can download generated metadata in JSON format for further processing or archiving.
- Results are shown as prettified JSON for easy review.

---

## Setup & Installation

### Backend Setup:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Create a .env file for Google Gemini API key if needed, or set key in gemini_utils.py
uvicorn main:app --reload
```

### Frontend Setup:

```bash
npm install
npm start
```
- **Frontend** runs on `localhost:3000`  
- **Backend API** defaults to `localhost:8000`

---

## Usage

1. Open the frontend and upload a monument photo.
2. Enter a short description of the monument (optional but recommended for better results).
3. Submit and review the detailed metadata returned by the AI.
4. Download metadata as JSON for external use.

---

## Detailed File/Component Overview

### `src/App.js`  
- Orchestrates the user workflow: file upload, preview, description input, POST request to backend, shows metadata, supports download.

### `backend/main.py`
- Defines REST endpoints, handles file reception and encoding, error handling, and interacts with Gemini-powered metadata generator.

### `backend/gemini_utils.py`
- Encapsulates Gemini API calls, loads images, sends prompt (uses strong domain-specific template), and returns AI-generated metadata.

### `public/index.html`  
- Custom theme, drag-and-drop UX, demonstration cards, dark mode toggle (UI/UX polish).

### Prompt Customization:  
- Edit `backend/prompt_templates.txt` to refine or adjust metadata requirements as the AI prompt for best domain results.

---

## Testing

- Frontend basic test coverage with React Testing Library (`src/App.test.js`)
- Extend backend tests (not included currently) for endpoints and error handling.

---

## Extensibility & Customization

- **Prompt templates** are easy to edit for new domains or metadata fields.
- Gemini integration can be switched out to other generative AI providers.
- Frontend and backend modular for new features—multi-image, user accounts, advanced result handling, etc.

---

