import React from 'react';
import styled from 'styled-components';
import Card from './Category';

const CardsRow = ({ categories }) => {
  // Array of possible font colors
  const fontColors = [
     "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4"
  ];

  // Array of fancy colors for gradient generation
  const fancyColors = [
    "#6febb2", "#bfe848", "#e3a158", "#d8e358", "#b1e01691"
  ];

  return (
    <RowContainer>
      <Row>
        {categories.map((title, i) => {
          // Select a random font color
          const randomFontColor = fontColors[Math.floor(Math.random() * fontColors.length)];
          // Select two random fancy colors for the gradient
          const randomFancy1 = fancyColors[Math.floor(Math.random() * fancyColors.length)];
          const randomFancy2 = fancyColors[Math.floor(Math.random() * fancyColors.length)];
          // Create a linear gradient string
          const gradient = `linear-gradient(45deg, ${randomFancy1}, ${randomFancy2})`;
          
          return (
            <Card 
              key={i} 
              title={title} 
              fontColor={randomFontColor} 
              gradient={gradient} 
            />
          );
        })}
      </Row>
    </RowContainer>
  );
};

export default CardsRow;

const RowContainer = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  width: 90vw;
  margin: -30px;
  padding: 20px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 12px 6px;
    gap: 8px;
  }
`;
