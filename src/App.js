
import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';


class App extends Component {

  unSubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }
      setCurrentUser({ userAuth });
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shops' component={ShopPage} />
          <Route path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div >
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
