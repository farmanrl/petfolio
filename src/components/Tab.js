import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import Home from './Home';
import PetPalsList from './PetPalsList';
import PetPlacesList from './PetPlacesList';
import AddPlaceForm from './AddPlaceForm';
import AddPetForm from './AddPetForm';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activekey: 1};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(activekey) {
    this.setState({activekey});
  }
  render() {
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={this.state.activekey} onSelect={this.handleSelect}>
          <NavItem eventKey={1} title="Item">Pet Feed</NavItem>
          <NavItem eventKey={2} title="Item">Pet Pals</NavItem>
          <NavItem eventKey={3} title="Item">Pet Places</NavItem>
        </Nav>
        <div>
          {(this.state.activekey === 1) && <Home />}
        </div>
        <div>
          {(this.state.activekey === 2) && <PetPalsList />}
        </div>
        <div>
          {(this.state.activekey === 3) && <PetPlacesList/>}
        </div>
      </div>
    );
  }
}
