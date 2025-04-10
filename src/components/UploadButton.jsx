import { useState } from "react";

function UploadButton({ onClose, onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        onUpload(data.fileUrl);
        onClose();
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="upload-modal">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default UploadButton;
