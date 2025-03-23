import React from 'react';
import styled from 'styled-components';

const NewsMagJob = () => {
  return (
    <StyledWrapper>
      <div className="container">
        {/* AI News Section */}
        <a href="/comingsoon" className="glass" style={{ '--r': -15 }} data-text="AI News">
          <img src="/images/news.png" alt="AI News" className="icon" />
        </a>

        {/* AI Magazines Section */}
        <a href="/comingsoon" className="glass" style={{ '--r': 5 }} data-text="AI Magazines">
          <img src="/images/magazine.png" alt="AI Magazines" className="icon" />
        </a>

        {/* AI Jobs Section */}
        <a href="/comingsoon" className="glass" style={{ '--r': 25 }} data-text="AI Jobs">
          <img src="/images/jobs.png" alt="AI Jobs" className="icon" />
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container .glass {
    position: relative;
    width: 300px;
    height: 350px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -45px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
    text-decoration: none; /* ✅ Remove underline */
    color: inherit; /* ✅ Keep text color */
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: linear-gradient(to right, rgba(24, 173, 84, 0.5), rgba(163, 215, 51, 0.5)); 
  }

  .container .glass .icon {
    width: 80px;  /* Adjust size */
    height: 80px;
    object-fit: contain;
  }
`;

export default NewsMagJob;
