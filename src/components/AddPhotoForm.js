import React from 'react';
import * as firebase from '../firebase';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class AddPhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {petValue: '', photoValue: ''};
    this.handlePetChange = this.handlePetChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }
  handlePetChange(event) {
    this.setState({petValue: event.target.value});
  }
  handlePhotoChange(event) {
    this.setState({photoValue: event.target.value});
  }
  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Add a Pet Photo</ControlLabel>
            <FormControl
                type="text"
                value={this.state.petValue}
                placeholder="Tag a pet"
                onChange={this.handlePetChange}
            />
            <FormControl
                type="text"
                value={this.state.photoValue}
                placeholder="Enter photo"
                onChange={this.handlePhotoChange}
            />
          </FormGroup>
        </form>
        <Button onClick={() => firebase.addPhoto(this.state.petValue, this.state.photoValue)}>Add Pet Photo</Button>
      </div>
    );
  }
}
