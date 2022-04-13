import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const NavItem = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.activeClassName ? props.theme.primary : '#000000')};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 600;
  font-size: 16px;
  &:hover,
  &.active {
    color: ${(props) => props.theme.primary};
    box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.primary};
  }
`;

export class Navigation extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <NavigationWrapper className="header-navigation">
          <NavList>
            <NavItem to="/">ALL</NavItem>
            <NavItem to="/tech">TECH</NavItem>
            <NavItem to="/clothes">CLOTHES</NavItem>
          </NavList>
        </NavigationWrapper>
      </ThemeProvider>
    );
  }
}
