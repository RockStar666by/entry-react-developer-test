import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = { primary: '#5ece7b' };

const NavigationWrapper = styled.nav`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
`;

const NavList = styled.ul`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    color: ${(props) => props.theme.primary};
    box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.primary};
  }
`;

export class Navigation extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavigationWrapper className='header-navigation'>
          <NavList>
            <NavItem>ALL</NavItem>
            <NavItem>TECH</NavItem>
            <NavItem>CLOTHES</NavItem>
          </NavList>
        </NavigationWrapper>
      </ThemeProvider>
    );
  }
}
