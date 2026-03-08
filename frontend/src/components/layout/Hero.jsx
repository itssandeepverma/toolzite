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
          <span className="hero-tools-text">AI, PDF, Code and Image Tools</span>
        </div>
        <p className="hero-tagline">
          Access every tool you need to ship faster, work smarter, and get tasks done easily.
        </p>
      </div>
    </div>

    
  );
};

export default HeroSection;
