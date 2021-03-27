import React from 'react';
import Top from './top';
import Footer from './footer';
import '../style/background.css';

const MainLayout = ({ children }) => {
  return (
    <div className='home_container'>
      <div className='home_left_area'>Pet by Pet</div>
      <div className='inner_container'>
        <Top />
        <div className='inner_contents'>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
