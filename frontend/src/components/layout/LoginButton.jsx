import React from 'react';
import styled from 'styled-components';

const Button = ({ text, onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        <div className="dots_border" />
        <span className="text_button">{text}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    --black-700: hsla(0 0% 12% / 1);
    --border_radius: 9999px;
    --transtion: 0.3s ease-in-out;
    --offset: 2px;

    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    transform-origin: center;

    padding: 0.7rem 1.4rem; /* Reduced by 30% */
    background-color: transparent;

    border: none;
    border-radius: var(--border_radius);
    transform: scale(1);

    transition: transform var(--transtion);
  }

  .button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    background-color: var(--black-700);

    border-radius: var(--border_radius);
    box-shadow: inset 0 0.5px hsl(0, 0%, 0%), inset 0 -1px 2px 0 hsl(0, 0%, 0%);
    transition: all var(--transtion);
    z-index: 0;
  }

  .button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;
    background-position: top;

    opacity: var(--active, 0);
    transition: opacity var(--transtion);
    z-index: 2;
  }

  .button:is(:hover, :focus-visible) {
    --active: 1;
    transform: scale(1.1); /* Apply scaling */
  }

  .button:active {
    transform: scale(1.2); /* Apply scaling when active */
  }

  .button .dots_border {
    --size_border: calc(100% + 2px);

    overflow: hidden;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: var(--size_border);
    height: var(--size_border);
    background-color: transparent;

    border-radius: var(--border_radius);
    z-index: -10;
  }

  .button .dots_border::before {
    content: "";
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left;
    transform: rotate(0deg);

    width: 100%;
    height: 1.4rem; /* Reduced height by 30% */
    
    /* Apply linear gradient for the rotating border */
    background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));

    mask: linear-gradient(transparent 0%, white 120%);
    animation: rotate 2s linear infinite; /* Rotation remains */
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg); /* Continuous rotation */
    }
  }

  .button .sparkle {
    position: relative;
    z-index: 10;

    width: 1.75rem;
  }

  .button .sparkle .path {
    fill: currentColor;
    stroke: currentColor;

    transform-origin: center;

    color: hsl(0, 0.00%, 100.00%);
  }

  .button:is(:hover, :focus) .sparkle .path {
    animation: path 1.5s linear 0.5s infinite;
  }

  .button .sparkle .path:nth-child(1) {
    --scale_path_1: 1.2;
  }
  .button .sparkle .path:nth-child(2) {
    --scale_path_2: 1.2;
  }
  .button .sparkle .path:nth-child(3) {
    --scale_path_3: 1.2;
  }

  @keyframes path {
    0%,
    34%,
    71%,
    100% {
      transform: scale(1);
    }
    17% {
      transform: scale(var(--scale_path_1, 1));
    }
    49% {
      transform: scale(var(--scale_path_2, 1));
    }
    83% {
      transform: scale(var(--scale_path_3, 1));
    }
  }

  .button .text_button {
    position: relative;
    z-index: 10;

    background-image: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32)); /* New gradient */
    background-clip: text;

    font-size: 1rem;
    color: transparent;
  }
`;


export default Button;
