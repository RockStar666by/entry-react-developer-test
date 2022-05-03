import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { CATEGORIES } from './Queries';
import { client } from '../../apollo/apollo';

const theme = { primary: '#5ece7b' };

const NavigationWrapper = styled.nav`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
`;

const NavList = styled.ul`
  padding: 0;
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
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  // jacket-canada-goosee

  componentDidMount() {
    client.query({ query: CATEGORIES }).then((result) => {
      console.log(result.data);
      this.setState({ categories: result.data.categories });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <NavigationWrapper className="header-navigation">
          <NavList>
            {categories.map((category) => (
              <NavItem key={category.name} to={`/${category.name}`}>
                {category.name.toUpperCase()}
              </NavItem>
            ))}
          </NavList>
        </NavigationWrapper>
      </ThemeProvider>
    );
  }
}
