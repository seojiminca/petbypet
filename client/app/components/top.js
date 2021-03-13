import React from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <nav>
      <div>
        <Link to='/'>
          <h1>PET BY PET</h1>
        </Link>
        <ul>
          <li>
            <Link to='/signin'>sign in</Link>
          </li>
          <li>
            <Link to='/userregistration'>sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Top;
