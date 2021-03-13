import React, { useState } from 'react';
import MainLayout from '../screen/MainLayout';
import Top from '../components/top';
import Footer from '../components/footer';
import ProductList from '../screen/product.list';
import '../style/list.css';
import '../style/background.css';

const Main = () => {
  return (
      <ProductList />
  );
};

export default Main;
