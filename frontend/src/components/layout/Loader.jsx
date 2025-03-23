import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the loading wave animation
const loadingWave = keyframes`
  0% {
    left: -100%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 100%;
  }
`;

// Styled Components
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
`;

const LoaderBar = styled.div`
  width: 60%;
  height: 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
`;

const LoaderFill = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #009c3e, #acec20);
  position: absolute;
  left: -100%;
  animation: ${loadingWave} 2.5s infinite ease-in-out;
  box-shadow: 0px 0px 20px rgba(172, 236, 32, 0.8);
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderBar>
        <LoaderFill />
      </LoaderBar>
    </LoaderContainer>
  );
};

export default Loader;
