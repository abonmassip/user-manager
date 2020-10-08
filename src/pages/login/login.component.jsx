import React from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './login.styles.scss';

class LoginPage extends React.Component {

  initialState = {
    email: '',
    password: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    
    const {email, password} = this.state;

    auth.signInWithEmailAndPassword(email, password);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div id="loginform">
        <form action="">
          <h1>Login here!</h1>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
            placeholder="password"
          />
          <div className="buttons">
            <button type="submit" onClick={this.handleSubmit}>LOGIN</button>
            <span>or</span>
            <button type="button" onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage;