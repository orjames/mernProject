import React from 'react';
import {Navbar, Nav, InputGroup, Button} from 'react-bootstrap';

export default class HeaderNavigation extends React.Component {
  render() {
    let brand = <a href='#'>Project Name</a>;
    return (
      <Navbar brand={brand} fixedTop inverse toggleNavKey={0}>
        <Nav right eventKey={0}>
          <form className='navbar-form' action="">
            <InputGroup type='text' placeholder='email' />{' '}
            <InputGroup type='text' placeholder='password' />{' '}
            <Button bsStyle='success' type='submit'>Sign in</Button>
          </form>
        </Nav>
      </Navbar>
    );
  }
}