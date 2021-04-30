import React from 'react';
import { Link } from 'react-router-dom';
import '../style/review.css';
import { getFaceImage, getAge } from '../util';

const Review = ({ reviews }) => {

  return (
    <section className='review-frame'>
      <h2 className='review-title'>Reviews</h2>

      {!reviews || reviews.length < 1 ? (
        <div>
          <h3>아직 리뷰가 없습니다.</h3>
        </div>
      ) : (
        <ul>
          {reviews.map((review) => (
            <>
              <li key={review._id}>
                <div className='each-user-review'>
                    <div className='group-left'>
                        <Link
                          key={review._id}
                          to={{
                            pathname: '/catProfile',
                            state: {
                              userId: review.user._id,
                              userName: review.user.name,
                            },
                          }}
                        >
                          <div className='cat-character-img'>
                            <img
                              src='https://www.flaticon.com/svg/static/icons/svg/208/208132.svg'
                              alt="user's cat image"
                            />
                          </div>
                        </Link>
                        <div className='cat-info'>
                            <h3>{review.cat.name}{`, ${getAge(review.cat.DOB)}`}</h3>
                            <h3>{review.cat.gender}</h3>
                        </div>
                    </div>
                    <div className='group-right'>
                        <div className='review-comment'>{review.comment}</div>
                        <div className='cat-face'>{getFaceImage(review.rate)}</div>
                    </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Review;
