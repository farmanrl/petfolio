import React from 'react';
import * as firebaseFunctions from '../firebase';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class AddHostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: undefined,
      locationValue: undefined,
      imageValue: undefined,
      descriptionValue: undefined,
      typeValue: undefined,
      open: true
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
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
  handleTypeChange(event, index, value) {
    this.setState({typeValue: value});
  }
  handleClose() {
    this.setState({open: false});
  }
  handleSubmit() {
    firebaseFunctions.addHost(
      this.state.nameValue,
      this.state.typeValue,
      this.state.locationValue,
      this.state.imageValue,
      this.state.descriptionValue
    );
  }
  render() {
    return (
      <div>
        <Dialog
            title="Add Host Form"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose} />,
              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSubmit} />,
            ]}
            modal={false}
            open={this.state.open}
            autoScrollBodyContent={true}
            onRequestClose={this.handleClose} >
              <SelectField
                  value={this.state.typeValue}
                  onChange={this.handleTypeChange}
                  autoWidth={true}
                  floatingLabelText="Select type of account"
                  floatingLabelFixed={false} >
                <MenuItem
                    value={'Personal'}
                    label="Personal"
                    primaryText="This is a personal account" />
                <MenuItem
                    value={'Public'}
                    label="Public"
                    primaryText="This pet is a public account" />
              </SelectField>
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
