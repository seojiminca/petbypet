import React, { useState } from 'react';
import Top from '../components/top';
import Footer from '../components/footer';
import ProductList from './product.list';
import '../style/list.css';
import '../style/background.css';

const MainLayout = ({ children }) => {
  return (
    <div className='container'>
      <div className='row' style={{ border: '1px solid blue' }}>
        <div className='col-lg-5' style={{ border: '1px solid purple' }}>
          Pet by Pet
        </div>
        <div className='col-lg-6 col-sm-12 inner-container'>
          <Top />
          {children}
          <Footer />
        </div>
        <div className='col--lg-1' style={{ border: '1px solid purple' }}>
          3 of 3
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
