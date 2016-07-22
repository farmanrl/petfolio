import React from 'react';
import * as firebase from '../firebase';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nameValue: null, locationValue: null, imageValue: null};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }
  handleLocationChange(event) {
    this.setState({locationValue: event.target.value});
  }
  handleImageChange(event) {
    this.setState({imageValue: event.target.value});
  }
  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Add a Pet</ControlLabel>
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
            <FormControl
                type="text"
                value={this.state.imageValue}
                placeholder="Enter image url"
                onChange={this.handleImageChange}
            />
          </FormGroup>
        </form>
        <button onClick={() => firebase.addPetProfile(this.state.nameValue, this.state.locationValue, this.state.imageValue)}>Add Pet</button>
      </div>
    );
  }
}
