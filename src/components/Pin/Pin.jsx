import React from "react";

const Pin = ({ image }) => {
  return (
    <div className="relative">
      <img src={image} alt="Pin" className="rounded-lg shadow-md w-full" />
    </div>
  );
};

export default Pin;
