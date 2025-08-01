import React, { useState } from 'react';
import './App.css';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Simulate backend response
    setMetadata({
      monument: "Gateway of India",
      type: "Colonial Arch",
      location: "Mumbai, India",
      style: "Indo-Saracenic",
      period: "Early 20th Century"
    });
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
      <p>Upload a monument photo & discover its story!</p>

      <label className="upload-btn">
        <input type="file" onChange={handleUpload} accept="image/*" hidden />
        ➕ Upload Image
      </label>

      {imagePreview && (
        <div className="preview-box">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      {imageFile && (
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      )}

      {metadata && (
        <div className="result-box">
          <h2>Result</h2>
          <p><strong>Monument:</strong> {metadata.monument}</p>
          <p><strong>Type:</strong> {metadata.type}</p>
          <p><strong>Location:</strong> {metadata.location}</p>
          <p><strong>Style:</strong> {metadata.style}</p>
          <p><strong>Period:</strong> {metadata.period}</p>
          <button className="download-btn" onClick={downloadMetadata}>⬇ Download Metadata</button>
        </div>
      )}
    </div>
  );
}

export default App;
