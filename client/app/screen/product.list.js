import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

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
              <img className='product-img' src={item.image} />

              <div className='title'>
                <h6>{item.brand}</h6>
                <h3>{item.name}</h3>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </MainLayout>
  );
};
export default ProductList;
