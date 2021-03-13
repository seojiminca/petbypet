import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './MainLayout';

const ProductDetail = () => {
  const { productId } = useLocation().state;
  const [productData, setProductData] = useState({});
  //const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const product = await axios(
        `http://localhost:5000/products/${productId}`
      );
      //const reviews = await axios(`http://localhost:5000/reviews/${productId}`);
      setProductData(product.data);
    };

    fetchData();
  }, {});

  return (
    <MainLayout>
      <section>
        <div className='container text-center h-300'>
          <h3>{productData.brand}</h3>
          <h1 className='text-lg'>{productData.name}</h1>
          <img
            className='object-center h-200 w-full'
            src={productData.image}
          ></img>
          <ul>
            <li>item form: {productData.item_form}</li>
            <li>flavour: {productData.flavour}</li>
            <li>{productData.desc}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Reviews</h2>
        <button className='bg-indigo-500'>
          <Link
            to={{
              pathname: `/reviewregistration/${productData.name}`,
              state: {
                productId: productData._id,
                image: productData.image,
              },
            }}
          >
            create new review
          </Link>
        </button>
        <li></li>
      </section>
    </MainLayout>
  );
};
export default ProductDetail;
