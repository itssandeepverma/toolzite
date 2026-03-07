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
  background:
    radial-gradient(circle at 10% 10%, rgba(90, 206, 122, 0.18), transparent 40%),
    radial-gradient(circle at 95% 0%, rgba(255, 180, 78, 0.16), transparent 42%),
    linear-gradient(180deg, #f3f5ef 0%, #eef2ea 100%);
`;

const LoaderBar = styled.div`
  width: 60%;
  height: 12px;
  border-radius: 6px;
  background-color: rgba(17, 34, 25, 0.08);
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

const Loader = ({ height = "100vh" }) => {
  return (
    <LoaderContainer style={{ minHeight: height, height }}>
      <LoaderBar>
        <LoaderFill />
      </LoaderBar>
    </LoaderContainer>
  );
};

export default Loader;
