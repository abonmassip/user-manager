import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const signOut = () => {
  auth.signOut();
};

const Header = ({ currentUser }) => {

  return(
  <div className="header">
    <Link to="/userslist">
      <button>Users List</button>
    </Link>
    <Link to={currentUser ? "/user" : "/"}>
      <span id="home" role="img" aria-label="Home">🏠</span>
    </Link>
    {
      currentUser ? (
        <div>
          <span>
            {currentUser.displayName}
          </span>
          <button onClick={signOut}>
            Sign out
          </button>
        </div>
      ) : (
        <span>
          You are not logged in.
        </span>
      )
    }
  </div>
)}

export default Header;