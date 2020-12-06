import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import UserIcon from '../assets/icons/ic-user.png';
import Logo from '../assets/icons/ic-logo-lg.png';

export default class GMANavbar extends React.Component {
    get greetingStr() {
        let currentHours = (new Date()).getHours() + 1; // Date.getHours() returns a number between 0-23
        if (currentHours < 12) {
            return 'Good Morning';
        } else if (currentHours < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

  render() {
    return (
        <Navbar collapseOnSelect expand="md">
            <Container>
                <Link className="navbar-brand ml-3" to="/">
                    <img style={{ height: '2.5rem' }} alt="logo" src={Logo} />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                    <Nav>{/* Empty Nav to center the Nav below  */}</Nav>
                    <Nav>
                        <Nav.Item className="text-center">
                            <Nav.Link activeClassName="nav-link-active" eventKey="1" as={NavLink} to="/dashboard">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="text-center">
                            <Nav.Link activeClassName="nav-link-active" eventKey="2" as={NavLink} to="/inventory">
                                Inventory
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item className="text-center">
                            <p className="greeting navbar-text mb-0 mr-3">{this.greetingStr}, John</p>
                            <img alt="user_setting" src={UserIcon} />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
}
