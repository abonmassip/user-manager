import React from 'react';

import noAvatar from '../../assets/no-avatar.jpg';

import { getUsersList } from '../../firebase/firebase.utils';

import './users-list.styles.scss';

class UsersList extends React.Component {

  constructor() {
    super();

    this.state = {
      usersList: [],
    }
  }

  handleGetList = async () => {
    const users = await getUsersList();
    users.sort((a, b) => {
      const upperA = a.displayName.toUpperCase();
      const upperB = b.displayName.toUpperCase();
      if (upperA < upperB) return -1;
      if (upperA > upperB) return 1;
      return 0;
    })
    this.setState({usersList: users});
  }

  componentDidMount() {
    this.handleGetList();
  }

  render() {
    
    const {usersList} = this.state;
    const {currentUser} = this.props;

    return (
      <div id="userslist">
        {
          currentUser
            ? (
            <div id="usergrid">
              {
                usersList.map(({id, displayName, photoURL}) => (
                  <div className="user" key={id}>
                    <img src={photoURL ? photoURL : noAvatar} alt="avatar" />
                    <p className="name">{displayName}</p>
                  </div>
                ))
              }
            </div>
          ) : (
            <div className="alert">
              <h1 className="red">Error <span>⚠</span></h1>
              <h2>You need to be a registered user</h2>
            </div>
          )
        }
      </div>
    )
  }
}

export default UsersList;