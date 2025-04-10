import React, { useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import "./UploadModal.css";

function UploadModal({ user, onClose, onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      return alert("Please select a file and add a title!");
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);  
    formData.append("userId", user?.profile["sub"] || "anonymous");
    formData.append("username", user?.profile["cognito:username"] || "anonymous");
    formData.append("createdAt", new Date().toISOString());
    formData.append("likes", JSON.stringify([]));
    formData.append("comments", JSON.stringify([]));
  
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Create new photo object with uploaded file URL
        const newPhoto = {
          id: Date.now().toString(),
          userId: user?.id || "anonymous",
          username: user?.username || "anonymous",
          title,
          description,
          imageUrl: data.fileUrl, // Use the URL returned from server
          likes: [],
          comments: [],
          createdAt: new Date().toISOString(),
        };
        
        onUpload(newPhoto);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <h2 className="modal-title">Create a Pin</h2>
        
        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-grid">
            <div className="image-upload-section">
              {previewUrl ? (
                <div className="image-preview-container">
                  <img src={previewUrl} alt="Preview" className="image-preview" />
                </div>
              ) : (
                <div className="upload-placeholder">
                  <FaImage className="upload-icon" />
                  <p>Drag and drop or click to upload</p>
                  <span className="file-hint">Recommendation: Use high-quality .jpg files</span>
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                id="file-input"
              />
              <label htmlFor="file-input" className="file-input-label">
                Select file
              </label>
            </div>
            
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add your title"
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell everyone what your Pin is about"
                  className="form-control"
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={!file || !title.trim() || isUploading}
                >
                  {isUploading ? "Uploading..." : "Create Pin"}
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;