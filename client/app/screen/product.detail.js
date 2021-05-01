import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../components/mainlayout';
import Review from '../components/review';
import '../style/product_detail.css';

const ProductDetail = () => {
  const { productId } = useParams();

  const [data, setData] = useState({ product: {}, reviews: [] });
  useEffect(() => {
    const fetchData = async () => {
      const [product, reviews] = await Promise.all([
        axios(`http://localhost:5000/products/${productId}`),
        axios(`http://localhost:5000/reviews/byProduct/${productId}`),
      ]);
      setData({ product: product.data, reviews: reviews.data });
    };
    fetchData();
  }, []);

  return (
    <MainLayout top={{ title: 'Reviews', isBackButton: true }} footer>
      <section>
        <div className='product-detail'>
          <div className='detail-img-wrapper'>
            <div>
              <img className='detail-img' src={data.product.image}></img>
            </div>
          </div>
          <div className='detail-wrapper'>
            <h1>{data.product.name}</h1>
            <h3>{data.product.brand}</h3>
            <button className='review-btn'>
              <Link
                className='btn-txt'
                to={{
                  pathname: `/reviewregistration/${data.product._id}`,
                  state: {
                    productId: data.product._id,
                    image: data.product.image,
                  },
                }}
              >
                Write a review
              </Link>
            </button>
            <ul className='face_detail'>
              <li>😄</li>
              <li>🙂</li>
              <li>😣</li>
            </ul>
            {/* <ul>
            <li>item form: {productData.item_form}</li>
            <li>flavour: {productData.flavour}</li>
            <li>{productData.desc}</li>
          </ul> */}
          </div>
        </div>
      </section>
      <Review reviews={data.reviews} />
    </MainLayout>
  );
};

export default ProductDetail;
