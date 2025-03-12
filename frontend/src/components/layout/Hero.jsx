import React from "react";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          The Ultimate Library of
        </h1>
        <div className="hero-title-image">
          <img src="/images/icon.png" alt="AI" className="hero-icon" />
          <span className="hero-tools-text">Tools</span>
        </div>
        <p className="hero-tagline">
          Access the most extensive collection of AI tools available online.
        </p>
      </div>
    </div>

    
  );
};

export default HeroSection;
