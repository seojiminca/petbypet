import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../style/top.css';
import {
  faChevronLeft,
  faHome,
  faUserPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Top = ({ title, isHome, isSign, isSettings, backFunc, params }) => {

  const history = useHistory();
  const user = localStorage.getItem('user');
  console.log(user);
  const goBackPage = () => {
    if(backFunc) backFunc();
    else history.goBack();
  }

  return (
    <nav className='topbar'>
        {!isHome && (
          <div className="topbar_left">
            <button>
              <FontAwesomeIcon icon={faChevronLeft} size='2x' onClick={goBackPage}/>
            </button>
           {!isSign && (
              <Link to='/'>
                <FontAwesomeIcon icon={faHome} size='2x' />
              </Link>
           )} 
          </div>
        )}
        <div className='topbar-center'>
          <h1>{title}</h1>
        </div>
        {!isSign && (
          <div className='topbar_right'>
          <Link to='/'>
            <FontAwesomeIcon icon={faSearch} size='2x'>search</FontAwesomeIcon>
          </Link>
          {(!isSettings) ? (
              <Link to='/login'>
                <FontAwesomeIcon icon={faUserPlus} size='2x' />
              </Link>
            ) : (
            <Link to='/login'>
              <FontAwesomeIcon icon={cog} size='2x' />
            </Link>
        )}
        </div>
        )}
        
    </nav>
  );
};

export default Top;
