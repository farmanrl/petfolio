import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import AddPetForm from './AddPetForm';
import AddPlaceForm from './AddPlaceForm';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Petfolio</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Pet Finder</NavItem>
              <NavItem eventKey={2} href="#">Place Finder</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <div style={{width: 400}}>
                  <AddPlaceForm />
                </div>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">About Us</NavItem>
              <NavItem eventKey={2} href="#">Pet FAQs</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
