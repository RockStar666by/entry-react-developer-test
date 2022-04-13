import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

export class AppRouting extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/tech" element={<CategoryPage product="Tech" />} />
        <Route path="/clothes" element={<CategoryPage product="Clothes" />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    );
  }
}
