import React, { Component } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';
import axios from 'axios';
import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class App extends Component {
  // if you refresh the browser, you lose the state, so we save token in both state and local storage
  // token determines if the user is logged in, will send that token to the back-end every time we need
  // to query the API, as long as that's there, the express JWT module will allow you to access the routes
  // rate limited will make it so you can't attempt to login unsuccessfully many times before it locks you out
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      loginSelected: false,
    };
    this.liftTokenToState = this.liftTokenToState.bind(this);
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
  }

  checkForLocalToken = () => {
    // look in local storage for the token
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // there is no token
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null,
      });
    } else {
      // found a token, send it to be verified
      axios.post('/auth/me/from/token', { token }).then((res) => {
        if (res.data.type === 'error') {
          localStorage.removerItem('mernToken');
          this.setState({ errorMessage: res.data.message });
        } else {
          // put token in local storage
          localStorage.setItem('mernToken', res.data.token);
          // put token in state
          this.setState({
            token: res.data.token,
            user: res.data.user,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.checkForLocalToken();
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user,
    });
  };

  logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('mernToken');
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null,
    });
  };

  handleClick(e) {
    e.preventDefault();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${
    //   this.state.token
    // }`; // this applies globally to all axios calls, sends token, otherwise do the config below for specific axios call
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    axios.get('/locked/test', config).then((res) => {
      this.setState({
        lockedResult: res.data,
      });
    });
  }

  loginClick = (e) => {
    this.setState({
      loginSelected: true,
    });
  };

  signUpClick = (e) => {
    this.setState({
      loginSelected: false,
    });
  };

  render() {
    let logbox;
    if (this.state.loginSelected === true) {
      logbox = (
        <div className="ifConRender">
          <div className="insideDiv">
            <p className="loginConrender"onClick={this.loginClick}> Login </p>
            <p className="registerConrender"onClick={this.signUpClick}> Register </p>
            <Login className="liftStateLogin"liftTokenToState={this.liftTokenToState} />
          </div>
        </div>
      );
    } else {
      logbox = (
        <div className="elseConRender">
          <p className="SecondloginConRender" onClick={this.loginClick}> Login </p>
          <p className="SecondregisterConRender" onClick={this.signUpClick}> Register </p>
          <Signup liftTokenToState={this.liftTokenToState} />
        </div>
      );
    }
    let user = this.state.user;
    let contents;
    if (user) {
      contents = (
        <Router>
          <div>
            {/* *****************  DO NOT TOUCH PLEASE FOR NOW ******************************* */}
            <Link to='/'> Home </Link> 
            <Link to={`/profile/${this.state.user._id}`}>Profile</Link> 
            <Route
              path='/'
              exact
              render={() => <Home user={this.state.user} />}
            />
            <Route
              path={`/profile/${this.state.user._id}`}
              render={() => (
                <UserProfile user={this.state.user} logout={this.logout} />
              )}
            />
          </div>
        </Router>
      );
    } else {
      contents =
      <div className="logBox">
      {logbox}
      </div>
    }

   
    return (
      <div className='App'>
        {contents}{' '}
        <p>
          <button onClick={this.handleClick}>test the protected route</button>
        </p>
        <p>{this.state.lockedResult}</p>
      </div>
    );
  }
}

export default App;
