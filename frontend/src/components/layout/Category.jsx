import React from 'react';
import styled from 'styled-components';

const Card = ({ title, fontColor, gradient, bgColor }) => {
  return (
    <StyledWrapper fontColor={fontColor} gradient={gradient} bgColor={bgColor}>
      <div className="card">
        {title}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 249px;
    height: 200px;
    background: ${(props) => props.bgColor || "rgba(58, 55, 55, 0.58)"}; /* Ensure background color */
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    font-size: 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);

    /* Default text color */
    color: ${(props) => props.fontColor || "black"};

    /* Apply gradient to text only if provided */
    ${(props) =>
      props.gradient &&
      `
      background-image: ${props.gradient}; 
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent;
    `}
  }

  .card:hover {
    transform: scale(1.02);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }

  @media (max-width: 768px) {
    .card {
      width: 190px;
      height: 150px;
      font-size: 1rem;
    }
  }
`;

export default Card;
