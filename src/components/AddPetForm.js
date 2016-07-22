import React from 'react';
import * as firebase from '../firebase';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nameValue: null, locationValue: null};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({locationValue: event.target.value});
  }
  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Enter your information</ControlLabel>
            <FormControl
                type="text"
                value={this.state.nameValue}
                placeholder="Enter name"
                onChange={this.handleNameChange}
            />
            <FormControl
                type="text"
                value={this.state.locationValue}
                placeholder="Enter location"
                onChange={this.handleLocationChange}
            />
          </FormGroup>
        </form>
        <button onClick={() => firebase.addPetProfile(this.state.nameValue, this.state.locationValue)}>Add Pet</button>
      </div>
    );
  }
}
