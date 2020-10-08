import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.styles.scss';

const WelcomePage = () => {
  return (
    <div>
      <div id="welcomepage">
        <h1>Welcome!</h1>
        <h2>are you a registered user?</h2>
        <div>
          <Link to="/login">
            <button>YES</button>
          </Link>
          <Link to="/register">
            <button>NO</button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default WelcomePage;