import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../components/mainlayout';
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
            <img className='detail-img' src={data.product.image}></img>
          </div>
          <div className='detail-wrapper'>
            <h1>{data.product.name}</h1>
            <h3>{data.product.brand}</h3>
            <button className='review-btn'>
              <Link
                className='btn-txt'
                to={{
                  pathname: `/reviewregistration/${data.product.name}`,
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

      <section>
        <div>
          <h2>Reviews</h2>
        </div>

        {!data.reviews || data.reviews.length < 1 ? (
          <div>
            <h3>아직 리뷰가 없습니다.</h3>
          </div>
        ) : (
          <ul>
            {data.reviews.map((review) => (
              <>
                <hr />
                <li key={review._id}>
                  <div>
                    <div>
                      <img
                        src='https://www.flaticon.com/svg/static/icons/svg/208/208132.svg'
                        alt="user's cat image"
                      />
                    </div>
                    <div>
                      <Link
                        key={review._id}
                        to={{
                          pathname: '/userProfile',
                          state: {
                            userId: review.user._id,
                            userName: review.user.name,
                          },
                        }}
                      >
                        <h3>{review.user.name}</h3>
                      </Link>
                      <span>
                        {Array.from({ length: review.rate }, (v) => '*').join(
                          ''
                        )}
                      </span>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        )}
      </section>
    </MainLayout>
  );
};

export default ProductDetail;
