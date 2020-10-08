import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import WelcomePage from './pages/welcome/welcome.component';
import UsersList from './pages/users-list/users-list.component';
import UserPage from './pages/user/user.component';
import EditPage from './pages/edit/edit.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          })
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} />
        {
          currentUser
            ? (<Redirect to="/user" />)
            : (<Redirect to ="/"/>)
        }
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          {/* <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} /> */}
          <Route
            exact
            path="/userslist"
            render={(props) => (
              <UsersList {...props} currentUser={currentUser} />
            )}
          />
          <Route
            exact
            path="/user"
            render={(props) => (
              <UserPage {...props} currentUser={currentUser} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(props) => (
              <EditPage {...props} currentUser={currentUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
