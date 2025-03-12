import React from "react";
import styled from "styled-components";

const FadingDiv = () => {
  return (
    <Container>
      <Overlay />
      <ExploreButton>🚀 Explore All Categories</ExploreButton>
    </Container>
  );
};

export default FadingDiv;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.8) 90%);
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  pointer-events: none;
`;

const ExploreButton = styled.button`
  position: relative;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #6a5acd, #836fff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    background: linear-gradient(90deg, #483d8b, #7b68ee);
    transform: scale(1.05);
  }
`;
