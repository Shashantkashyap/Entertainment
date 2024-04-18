// LoadingPage.jsx
import React from "react";
import "./LoadingPage.css"; // Import your CSS file for styling

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
      <p className="loading-text font-bold text-white">Loading...</p>
    </div>
  );
};

export default LoadingPage;
