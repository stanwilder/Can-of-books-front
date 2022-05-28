import React from 'react';
import { withAuth0 } from "@auth0/auth0-react"
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        <NavItem>
          {
            this.props.auth0.isAuthenticated
              ?
              <LogoutButton />
              :
              <LoginButton />
          }
        </NavItem>
      </Navbar>
    )
  }
}

export default withAuth0(Header);
