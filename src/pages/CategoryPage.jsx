import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';

const CategoryPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: pink;
`;

export class CategoryPage extends React.Component {
  render() {
    return (
      <CategoryPageContainer>
        <h1>{this.props.product}</h1>
        <NavLink to="/product/10">Product</NavLink>
        <ProductCard />
      </CategoryPageContainer>
    );
  }
}

CategoryPage.propTypes = { product: PropTypes.string };

CategoryPage.defaultProps = { product: 'All Products' };
