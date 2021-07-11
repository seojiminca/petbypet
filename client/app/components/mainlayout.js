import React from 'react';
import Top from './top';
import Footer from './footer';
import '../style/background.css';

const MainLayout = ({ children, top, footer, loading }) => {
  return (
    <div className='home_container'>
      <div className='home_left_area'>Pet by Pet</div>
      <div className='inner_container'>
        {top && (
          <Top
            title={top.title}
            isHome={top.isHome}
            isSign={top.isSign}
            isSettings={top.isSettings}
            backFunc={top.backFunc}
            params={top.params}
          />
        )}
        <div className='inner_contents'>
          {children}
          {footer && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
