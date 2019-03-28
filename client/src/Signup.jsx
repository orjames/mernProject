import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: '',
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  handleLastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

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
      .post('/auth/signup', {
        firstName: this.state.firstName,
        lastName: this.state.email,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.type === 'error') {
          this.setState({
            message: res.data.message,
          });
          console.log(`error ${res.data.message}`);
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.props.liftTokenToState(res.data);
        }
      })
      .catch((err) => {
        this.setState({
          message:
            'maximum accounts exceeded, please try again later. (begone hacker!)',
        });
      });
  };

  render() {
    return (
      <div className='loginContainer'>
        <form className='loginForm' onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleFirstNameChange}
            value={this.state.firstName}
            type='text'
            name='firstName'
            placeholder='your first name...'
            minLength='1'
            maxLength='99'
          />
          <br />

          <input
            type='text'
            onChange={this.handleLastNameChange}
            value={this.state.lastName}
            type='text'
            name='lastName'
            placeholder='your last name...'
            minLength='1'
            maxLength='99'
          />
          <br />

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
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;