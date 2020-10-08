import React, { useState } from 'react';


import Login from '../../components/login/login.component';
import Register from '../../components/register/register.component';

import './welcome.styles.scss';

const WelcomePage = () => {
  const [userState, setUserState] = useState(null);
  return (
    <div>
      <div id="welcomepage">
        <h1>Welcome!</h1>
        <h2>are you a registered user?</h2>
        <div>
          <button onClick={() => setUserState('registered')}>YES</button>
          <button onClick={() => setUserState('not-registered')}>NO</button>
        </div>
        {
          userState === 'registered'
            ? <Login />
            : null
        }
        {
          userState === 'not-registered'
            ? <Register />
            : null
        }
      </div>
    </div>
  )
};

export default WelcomePage;