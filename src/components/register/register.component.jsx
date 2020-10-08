import React from 'react';

import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
} from '../../firebase/firebase.utils';

import './register.styles.scss';

class Register extends React.Component {

  initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    likes: '',
    photoURL: '',
  }

  constructor() {
    super();

    this.state = this.initialState;
  }
  
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { 
      displayName,
      email,
      password,
      confirmPassword,
      likes,
      photoURL,
    } = this.state;

    if(password !== confirmPassword) {
      alert(`Passwords don't match!`);
      return;
    }
    if(!password) {
      return alert(`Add a password`);
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      
      await createUserProfileDocument(user, {displayName, likes, photoURL});

      this.setState = this.initialState;
    } catch (error) {
      console.error('there has been an error', error.message);
    }   
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      likes,
      photoURL,
    } = this.state;
    
    return (
      <div id="registerform">
        <form action="">
          <h1>Register!</h1>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="User Name"
            required
            placeholder="name *"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
            placeholder="email *"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
            placeholder="password *"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
            placeholder="confirm password *"
          />
          <input
            type="text"
            name="likes"
            value={likes}
            onChange={this.handleChange}
            label="Likes"
            placeholder="what is your favorite thing?"
          />
          <input
            type="text"
            name="photoURL"
            value={photoURL}
            onChange={this.handleChange}
            label="Photo URL"
            placeholder="Your Photo URL"
          />
          <span className="required">* = Required fields</span>
          <div className="buttons">
            <button type="submit" onClick={this.handleSubmit}>REGISTER</button>
            <span>or</span>
            <button type="button" onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Register;