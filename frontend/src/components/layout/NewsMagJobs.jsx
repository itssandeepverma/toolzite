import React from 'react';
import styled from 'styled-components';

const NewsMagJob = () => {
  return (
    <StyledWrapper>
      <div className="container">
        {/* AI News Section */}
        <a href="/ai-news" className="glass news" style={{ '--r': -20, '--grad': 'linear-gradient(135deg, #00b894 0%, #0984e3 100%)' }} data-text="AI News">
          <img src="/images/news.png" alt="AI News" className="icon" />
        </a>

        {/* AI Newsletters Section */}
        <a href="/ai-newsletters" className="glass newsletters" style={{ '--r': -7, '--grad': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} data-text="AI Newsletters">
          <img src="/images/magazine.png" alt="AI Newsletters" className="icon" />
        </a>

        {/* AI Jobs Section */}
        <a href="/ai-jobs" className="glass jobs" style={{ '--r': 7, '--grad': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} data-text="AI Jobs">
          <img src="/images/jobs.png" alt="AI Jobs" className="icon" />
        </a>

        {/* AI Papers Section */}
        <a href="/ai-papers" className="glass papers" style={{ '--r': 20, '--grad': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }} data-text="AI Papers">
          <img src="/images/magazine.png" alt="AI Papers" className="icon" />
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
    width: 250px;
    height: 300px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -30px;
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
    background: var(--grad, rgba(255, 255, 255, 0.05));
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  .container .glass .icon {
    width: 70px;  /* Adjust size */
    height: 70px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 20px;
    }
    
    .container .glass {
      margin: 0;
      transform: none;
      width: 280px;
      height: 200px;
    }
    
    .container:hover .glass {
      transform: none;
      margin: 0;
    }
  }
`;

export default NewsMagJob;
