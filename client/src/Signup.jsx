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
      <div className='signup'>
        <h3>create a new account:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
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
            onChange={this.handleEmailChange}
            value={this.state.email}
            type='email'
            name='email'
            placeholder='your email...'
            minLength='5'
            maxLength='99'
          />
          <br />
          <input
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type='password'
            name='password'
            placeholder='choose a password...'
            minLength='8'
            maxLength='128'
          />
          <br />
          <input className='button' type='submit' value='signup' />
        </form>
      </div>
    );
  }
}

export default Signup;