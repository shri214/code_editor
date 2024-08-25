import React from "react";
import styled, { keyframes } from "styled-components";

// Define the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled-component for the loader
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4a90e2; /* Primary color for the spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50% -50%);
`;

// Styled-component for the loader wrapper (for centering and positioning)
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LoaderProps {
  size?: number; // Optional size prop to adjust spinner size
  color?: string; // Optional color prop to change spinner color
}

export const Loading: React.FC<LoaderProps> = ({
  size = 40,
  color = "#4a90e2",
}) => {
  return (
    <LoaderWrapper>
      <Spinner
        style={{
          width: size,
          height: size,
          borderLeftColor: color,
        }}
      />
    </LoaderWrapper>
  );
};
