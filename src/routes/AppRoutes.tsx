import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Product';
import ProductDetails from '../pages/ProductDetail';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Blog from '../pages/Blog';
import Faq from '../pages/Faq';
import About from '../pages/About';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
