import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Please enter a description for metadata generation.");
      return;
    }
    if (!imageFile) {
      alert("Please upload an image file.");
      return;
    }

    setLoading(true);
    setMetadata(null); // Clear previous metadata
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('description', description);

      const response = await axios.post('http://localhost:8000/generate_metadata/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data?.metadata;

      if (result) {
        setMetadata(result);
      } else {
        alert("Unexpected response from backend.");
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
      alert("Failed to fetch metadata from backend.");
    } finally {
      setLoading(false);
    }
  };

  const downloadMetadata = () => {
    const data = JSON.stringify(metadata, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'metadata.json';
    link.href = url;
    link.click();
  };

  return (
    <div className="container">
      <h1>Monument Classification and Metadata Generation</h1>
      <p>Upload a monument photo & enter a short description to generate metadata.</p>

      <label className="upload-btn">
        <input type="file" onChange={handleUpload} accept="image/*" hidden />
        ➕ Upload Image
      </label>

      {imagePreview && (
        <div className="preview-box">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      <textarea
        placeholder="Enter a short description of the monument..."
        value={description}
        onChange={handleDescriptionChange}
        rows={4}
        className="description-box"
      />

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading || !imageFile || !description.trim()}
      >
        {loading ? 'Generating...' : 'Submit'}
      </button>

      {metadata && (
        <div className="result-box">
          <h2>Result</h2>
          <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
            {metadata}
          </pre>
          <button className="download-btn" onClick={downloadMetadata}>
            ⬇ Download Metadata
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
