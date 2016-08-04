import React from 'react';
import * as firebaseFunctions from '../firebase';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nameValue: null, locationValue: null, imageValue: null, descriptionValue: null, open: true};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  handleDescriptionChange(event) {
    this.setState({descriptionValue: event.target.value});
  }
  handleClose() {
    this.setState({open: false});
  }
  handleSubmit() {
    firebaseFunctions.addPetPlace(this.state.nameValue, this.state.locationValue, this.state.imageValue, this.state.descriptionValue);
  }
  render() {
    return (
      <div>
        <Dialog
            title="Add Place Form"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                           />,
              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit}
                           />,
            ]}
            modal={false}
            open={this.state.open}
            autoScrollBodyContent={true}
            onRequestClose={this.handleClose}
        >
                <TextField
                    hintText="Name"
                    value={this.state.nameValue}
                    onChange={this.handleNameChange}
                /><br />
                <TextField
                    hintText="Location"
                    value={this.state.locationValue}
                    onChange={this.handleLocationChange}
                /><br />
                <TextField
                    hintText="Photo"
                    value={this.state.imageValue}
                    onChange={this.handleImageChange}
                /><br />
                <TextField
                    hintText="Description"
                    value={this.state.descriptionValue}
                    onChange={this.handleDescriptionChange}
                    multiLine={true}
                    rows={1}
                    rowsMax={4}
                /><br />
        </Dialog>
      </div>
    );
  }
}
