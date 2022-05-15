import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { CATEGORY } from './Queries';
import { client } from '../apollo/apollo';
import { CustomButton } from '../feature/CustomButton/CustomButton';

const itemsPerPage = 6;
let arrayForHoldingItems = [];

const CategoryPageContainer = styled.div`
  position: relative;
  width: 1440px;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
  padding: 80px 100px 0;
  margin-bottom: 190px;
`;

const CategoryPageTitle = styled.h2`
  margin: 0;
  position: relative;
  margin-bottom: 100px;
  height: 70px;
  font-weight: 400;
  font-size: 42px;
  line-height: 70px;
`;

const ProductsContainer = styled.div`
  position: relative;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoryProducts: [], loading: true, itemsToShow: [], nextItems: 6 };
    this.loopWithSlice = this.loopWithSlice.bind(this);
    this.handleShowMoreItems = this.handleShowMoreItems.bind(this);
  }

  componentDidMount() {
    client.query({ query: CATEGORY, variables: { category: `${this.props.category}` } }).then((result) => {
      console.log('MOUNT', result.data);
      this.setState({ categoryProducts: result.data.category.products, loading: result.loading });
    });

    this.loopWithSlice(0, itemsPerPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.category !== prevProps.category) {
      client.query({ query: CATEGORY, variables: { category: `${this.props.category}` } }).then((result) => {
        console.log('UPDATE', result.data);
        this.setState({ categoryProducts: result.data.category.products, loading: result.loading, nextItems: 6 });
      });
      arrayForHoldingItems = [];
    }
    if (prevState.categoryProducts !== this.state.categoryProducts) {
      this.loopWithSlice(0, itemsPerPage);
    }
  }

  handleShowMoreItems() {
    this.loopWithSlice(this.state.nextItems, this.state.nextItems + itemsPerPage);
    this.setState((prevState) => ({ nextItems: prevState.nextItems + itemsPerPage }));
  }

  loopWithSlice(start, end) {
    const slicedItems = this.state.categoryProducts.slice(start, end);
    console.log(slicedItems);
    arrayForHoldingItems = [...arrayForHoldingItems, ...slicedItems];
    this.setState({ itemsToShow: arrayForHoldingItems });
  }

  render() {
    const { categoryProducts, loading, itemsToShow, nextItems } = this.state;
    const { category, title } = this.props;
    console.log(categoryProducts, loading, itemsToShow, nextItems);
    return loading ? (
      <h2>LOADING...</h2>
    ) : (
      <CategoryPageContainer>
        <CategoryPageTitle>{category === 'all' ? title : category.charAt(0).toUpperCase() + category.slice(1)}</CategoryPageTitle>
        <ProductsContainer>
          {/* eslint-disable-next-line */}
          {itemsToShow.map((product) => {
            const { id, brand, name, attributes, prices, gallery, inStock } = product;
            console.log('ATTRIBUTES', name, attributes);
            return (
              <ProductCard
                key={id}
                id={id}
                brand={brand}
                name={name}
                gallery={gallery}
                attributes={attributes}
                prices={prices}
                inStock={inStock}
              />
            );
          })}
        </ProductsContainer>
        {nextItems < categoryProducts.length && <CustomButton actionOnClick={this.handleShowMoreItems}>SHOW MORE</CustomButton>}
      </CategoryPageContainer>
    );
  }
}

CategoryPage.propTypes = { category: PropTypes.string, title: PropTypes.string };
CategoryPage.defaultProps = { category: 'all', title: 'All Products' };
