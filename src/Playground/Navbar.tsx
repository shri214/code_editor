import React from 'react';
import styled from 'styled-components';
import logo from '../../src/assets/logo-small.png';
import { useNavigate } from 'react-router-dom';

// Define props type for the Navbar component
interface NavbarProps {
  isFullScreen: boolean;
}

// Styled components
const NavbarContainer = styled.div<{ isFullScreen: boolean }>`
  height: ${({ isFullScreen }) => (isFullScreen ? '0' : '4.5rem')};
  background: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  position:sticky;
  top:0;
  left:0;
  z-index:10;
`;

const NavbarContent = styled.button`
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 60px;
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  color: #fff;

  span {
    font-weight: 700;
  }
`;

// Navbar component definition
export const Navbar: React.FC<NavbarProps> = ({ isFullScreen }) => {
  const navigate = useNavigate();

  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent
        onClick={() => {
          navigate('/');
        }}
      >
        <Logo src={logo} alt="Logo" />
        <MainHeading>
          <span>Code</span> Deck
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  );
};

