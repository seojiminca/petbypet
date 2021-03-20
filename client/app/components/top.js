import React from 'react';
import {Link} from 'react-router-dom';
import '../style/top_footer.css';

const Top = () => {
    return (
        <nav>
            <div className="top_bar">
                <div>
                    <Link to='/'>
                        <h1>PET BY PET</h1>
                    </Link>
                </div>
                <ul className="login">
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
