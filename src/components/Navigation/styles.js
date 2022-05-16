import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
`;

export const NavList = styled.ul`
  padding: 0;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const NavItem = styled(NavLink)`
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
