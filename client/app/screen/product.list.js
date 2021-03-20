import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../components/mainlayout';

const ProductList = () => {
  const [data, setData] = useState({ products: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/products');
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <ul>
        {data.products.map((item) => (
          <Link
            to={{
              pathname: `/productdetail/${item.name}`,
              state: {
                productId: item._id,
              },
            }}
          >
            <li key={item._id} className='product'>
              <div className='img_wrapper'>
                <img className='product-img' src={item.image} />
              </div>
              <div className='title_wrapper'>
                <div className='title'>
                  <h6>{item.brand}</h6>
                  <h3>{item.name}</h3>
                </div>
                <div className='face'>
                  <ul className='face_list'>
                    <li>😄</li>
                    <li>🙂</li>
                    <li>😣</li>
                  </ul>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </MainLayout>
  );
};
export default ProductList;
