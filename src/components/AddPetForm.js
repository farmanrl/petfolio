import React from 'react';
import * as firebaseFunctions from '../firebase';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nameValue: null, locationValue: null, imageValue: null};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(value) {
    this.setState({nameValue: value});
  }
  handleLocationChange(value) {
    this.setState({locationValue: value});
  }
  handleImageChange(value) {
    this.setState({imageValue: value});
  }
  handleSubmit() {
    firebaseFunctions.addPetProfile(this.state.nameValue, this.state.locationValue, this.state.imageValue);
  }
  render() {
    return (
      <div style={{padding: "16 16 16 16", width: 320}}>
        <TextField
            hintText="Name"
            onChange={this.handleNameChange}
        /><br />
        <TextField
            hintText="Location"
            onChange={this.handleLocationChange}
        /><br />
        <TextField
            hintText="Photo"
            onChange={this.handleImageChange}
        /><br />
        <FlatButton label="Add Pet" onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}
