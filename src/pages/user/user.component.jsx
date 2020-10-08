import React from 'react';
import { Redirect } from 'react-router-dom';

import { getRandomItem } from '../../utils/index';

import './user.styles.scss';

const UserPage = (props) => {
  if(!props.currentUser) return <Redirect to="/" />;
  
  const { displayName, email, photoURL, likes, createdAt } = props.currentUser;

  const reactions = [
    "Looking good!",
    "You are so handsome",
    "Hey! there you are",
    "What a beautiful picture",
  ]

  return (
    <div id="userpage">
      <h1>Hello <span className="highlight">{displayName}</span>!</h1>
      <p>Account created on
        <span className="highlight">{` ${createdAt.toDate().toDateString()}`}</span>
      </p>
      <p>Your email adress is <span className="highlight">{email}</span></p>
      {
        likes
          ? (<p>Your favorite thing is <span className="highlight">{likes}</span></p>)
          : (<p>We still don't know your favorite thing!</p>)
      }
      {
        photoURL
          ? (<div id="avatar">
              <img src={photoURL} alt="avatar" />
              <p>{getRandomItem(reactions)}</p>
            </div>)
          : (<p>Where is your picture? 😢</p>)
      }
      
    
      <button className="edit" onClick={() => props.history.push("/edit")}>edit your information</button>
    </div>
  )
};

export default UserPage;