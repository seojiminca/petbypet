import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/top_footer.css';
import {
  faChevronLeft,
  faHome,
  faUserPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Top = ({ title, isBackButton, backFunc, params }) => {
  const history = useHistory();
  return (
    <nav>
      <div className='top_bar'>
        {isBackButton && (
          <div>
            <Link style={{ marginRight: 20 }}>
              <FontAwesomeIcon icon={faChevronLeft} size='2x' />
            </Link>
            <Link to='/'>
              <FontAwesomeIcon icon={faHome} size='2x' />
            </Link>
          </div>
        )}
        <div className='topbar-title'>
          <h1>{title}</h1>
        </div>
        <Link to='/'>
          <FontAwesomeIcon icon={faSearch} size='2x' />
        </Link>
        <div className='login'>
          <Link>
            <FontAwesomeIcon icon={faUserPlus} size='2x' />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Top;
