import React from 'react';

import {
  editUserProfileDocument,
} from '../../firebase/firebase.utils';

import './edit.styles.scss';

class EditPage extends React.Component {

  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      likes: "",
      photoURL: "",
      createdAt: "",
    };
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
      likes,
      photoURL,
      id,
    } = this.state;

    try {
      await editUserProfileDocument(id, {displayName, likes, photoURL});
      this.props.history.push("/user");
    } catch (error) {
      console.error('there has been an error', error.message);
    }   
  };

  componentDidMount() {
    if(!this.props.currentUser) {
      return this.props.history.push("/");
    }

    this.setState({
      ...this.props.currentUser
    })
  }

  render() {
    const {
      displayName,
      likes,
      photoURL,
    } = this.state;
    
    return (
      <div id="editform">
        <form action="">
          <h1>Update your information</h1>
          <div id="fields">

            <fieldset>
              <label htmlFor="displayName">Your name: </label>
              <input
                type="text"
                name="displayName"
                value={displayName}
                onChange={this.handleChange}
                label="User Name"
                required
                placeholder="name"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="likes">Your favorite thing: </label>
              <input
                type="text"
                name="likes"
                value={likes}
                onChange={this.handleChange}
                label="Likes"
                placeholder="what do you like?"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="photoURL">Your photo URL: </label>
              <input
                type="text"
                name="photoURL"
                value={photoURL}
                onChange={this.handleChange}
                label="Photo URL"
                placeholder="Your Avatar URL"
              />
            </fieldset>
          </div>
          <div className="buttons">
            <button type="submit" onClick={this.handleSubmit}>UPDATE INFORMATION</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditPage;