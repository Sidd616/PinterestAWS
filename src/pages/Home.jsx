import React, { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid";
import UploadModal from "../components/UploadModal";
import "./Home.css";

function Home({ user, isAuthenticated }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [photos, setPhotos] = useState([""]);
  
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
      });
      
      const data = await response.json();
     // console.log(data);
      
      if (data.success) {
        setPhotos(data);
       // console.log("Photos:", photos);
      
      } else {
        setPhotos(data);
        //console.log("Photos:", data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error Fetching file. Please try again.");
    }
  };

  
  useEffect(() => {
    fetchPosts();
    
  }, []);  

  const handleUpload = (newPhoto) => {
//    setPhotos([newPhoto, ...photos]);
    fetchPosts();
    setShowUploadModal(false);
  };

  return (
    <div className="home-page">
      {isAuthenticated && (
        <div className="upload-container">
          <button
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            <span className="plus-icon">+</span> Create Pin
          </button>
        </div>
      )}

      { photos.length > 0 ? (<PhotoGrid photos={photos} user={user} />) : ("")};
      

      {showUploadModal && (
        <UploadModal
          user={user}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default Home;