import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Edit from '../../components/edit/edit.component';
import Avatar from '../../components/avatar/avatar.component';

import './user.styles.scss';

const UserPage = ({ currentUser }) => {
  const [edit, setEdit] = useState(false);
 
  if(!currentUser)return <Redirect to="/" />;
  
  const { displayName, email, photoURL, likes, createdAt } = currentUser;

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
          : (<p>We still don't know what do you love the most!</p>)
      }
      <Avatar photoURL={photoURL} />
      
      <button className="edit" onClick={() => setEdit(true)}>edit your information</button>
    
      {
        edit
          ? <Edit currentUser={currentUser} setEdit={setEdit}/>
          : null
      }
    </div>
  )
};

export default UserPage;