import React from 'react';
import { Link } from 'react-router-dom';
import '../style/review.css';

const Review = ({ reviews }) => {

  const getFaceImage = (rate) => {
    if(rate === 1) return '😄';
    if(rate === 2) return '🙂';
    if(rate === 3) return '😣';
    return "X";
  }
  
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
                      <h3>{review.cat.name}</h3>
                      <h3>{review.cat.gender}</h3>
                    </div>
                    <pre className='review-comment'>{review.comment}</pre>
                    <div>{getFaceImage(review.rate)}</div>
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
