import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CATEGORIES } from '../../queries/getCategories';
import { client } from '../../apollo/apollo';
import * as Styles from './styles';

const theme = { primary: '#5ece7b' };
export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

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
        <Styles.NavigationWrapper className="header-navigation">
          <Styles.NavList>
            {categories.map((category) => (
              <Styles.NavItem key={category.name} to={`/${category.name}`}>
                {category.name.toUpperCase()}
              </Styles.NavItem>
            ))}
          </Styles.NavList>
        </Styles.NavigationWrapper>
      </ThemeProvider>
    );
  }
}
