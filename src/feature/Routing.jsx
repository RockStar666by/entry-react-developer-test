import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CATEGORIES } from '../queries/getCategories';
import { client } from '../apollo/apollo';
import { CategoryPage } from '../pages/CategoryPage/CategoryPage';
import { ProductPageWithRouter } from '../pages/ProductPage/ProductPage';
import { CartPage } from '../pages/CartPage/CartPage';

export class AppRouting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount() {
    client.query({ query: CATEGORIES }).then((result) => {
      this.setState({ categories: result.data.categories });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        {categories.map((category) => {
          return <Route key={category.name} path={`/${category.name}`} element={<CategoryPage category={`${category.name}`} />} />;
        })}
        <Route path="/product/:productId" element={<ProductPageWithRouter />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    );
  }
}
