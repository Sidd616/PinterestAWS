import React from "react";
import PhotoCard from "../components/PhotoCard";
import "./PhotoGrid.css";

function PhotoGrid({ photos, user }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div className="grid-item" key={photo.id}>
          <PhotoCard photo={photo} user={user} />
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;