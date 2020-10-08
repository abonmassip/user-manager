import React from 'react';

import { getRandomItem } from '../../utils/index';

import noAvatar from '../../assets/no-avatar.jpg';

import './avatar.styles.scss';

const Avatar = ({ photoURL }) => {
  const reactions = [
    "Looking good!",
    "You are so handsome",
    "Hey! there you are",
    "What a beautiful picture",
  ];

  return (
  <div>
    {
      photoURL
        ? (<div id="avatar">
            <img src={photoURL} alt="avatar" />
            <p>{getRandomItem(reactions)}</p>
          </div>)
        : (<div>
          <img src={noAvatar} alt="avatar" />
            <p>Where is your picture? <span role="img" aria-label="sad face">😢</span></p>
          </div>)
    }
  </div>
)};

export default Avatar;