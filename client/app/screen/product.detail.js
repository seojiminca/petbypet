import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../components/mainlayout';
import '../style/product_detail.css';

const ProductDetail = () => {
  const { productId } = useLocation().state;

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
    <MainLayout>
      <section>
        <div className='product-detail'>
          <div className='detail-img-wrapper'>
            <img className='detail-img' src={data.product.image}></img>
          </div>
          <div className='detail-wrapper'>
            <h1 className='text-lg'>{data.product.name}</h1>
            <h3>{data.product.brand}</h3>
            <button className='bg-indigo-500'>
              <Link
                to={{
                  pathname: `/reviewregistration/${data.product.name}`,
                  state: {
                    productId: data.product._id,
                    image: data.product.image,
                  },
                }}
              >
                create new review
              </Link>
            </button>
            <ul className='face_list'>
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

      <section className='mt-16'>
        <div className='text-center justify-center w-full lg:w-6/12 px-4'>
          <h2 className='my-6 text-2xl font-semibold'>Reviews</h2>
        </div>

        {!data.reviews || data.reviews.length < 1 ? (
          <div className='my-6 text-center justify-center w-full'>
            <h3>아직 리뷰가 없습니다.</h3>
          </div>
        ) : (
          <ul className='mt-12 justify-center'>
            {data.reviews.map((review) => (
              <>
                <hr className='my-6 mt-12 rounded-sm' />
                <li key={review._id}>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='col-1'>
                      <img
                        className='h-20 w-20 rounded mx-auto'
                        src='https://www.flaticon.com/svg/static/icons/svg/208/208132.svg'
                        alt="user's cat image"
                      />
                    </div>
                    <div className='col-span-2'>
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
