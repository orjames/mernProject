import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/auth/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.type === 'error') {
          this.setState({
            message: res.data.message,
          });
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.props.liftTokenToState(res.data);
        }
      })
      .catch((err) => {
        this.setState({
          message:
            'maximum login attempts exceeded. Please try again later. (begone hacker!)',
        });
      });
  };

  render() {
    return (
      <div className='loginContainer'>
        <form className='loginForm' onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleEmailChange}
            value={this.state.email}
            type='email'
            name='email'
            placeholder='enter your email...'
            minLength='5'
            maxLength='99'
            name=''
            id=''
          />

          <br />

          <input
            type='text'
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type='password'
            name='password'
            placeholder='enter your password...'
            minLength='8'
            maxLength='128'
          />

          <br />

          <button type='submit' value='login'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
