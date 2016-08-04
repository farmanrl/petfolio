import React from 'react';
import * as firebaseFunctions from '../firebase';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {nameValue: null, typeValue: null, locationValue: null, imageValue: null, descriptionValue: null, genderValue: null, ageValue: null, sizeValue: null, careValue: null, energyValue: null, trainingValue: null, open: true};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCareChange = this.handleCareChange.bind(this);
    this.handleEnergyChange = this.handleEnergyChange.bind(this);
    this.handleTrainingChange = this.handleTrainingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }
  handleTypeChange(event) {
    this.setState({typeValue: event.target.value});
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
  handleGenderChange(event, index, value) {
    this.setState({genderValue: value});
  }
  handleAgeChange(event, index, value) {
    this.setState({ageValue: value});
  }
  handleSizeChange(event, index, value) {
    this.setState({sizeValue: value});
  }
  handleCareChange(event, index, value) {
    this.setState({careValue: value});
  }
  handleEnergyChange(event, index, value) {
    this.setState({energyValue: value});
  }
  handleTrainingChange(event, index, value) {
    this.setState({trainingValue: value});
  }
  handleOpen() {
    this.setState({open: true});
  }
  handleClose() {
    this.setState({open: false});
  }
  handleSubmit() {
    this.setState({open: false});
    firebaseFunctions.addPetProfile(this.nameValue, this.typeValue, this.locationValue, this.imageValue, this.descriptionValue, this.ageValue, this.genderValue, this.sizeValue, this.careValue, this.energyValue, this.trainingValue);
  }
  render() {
    return (
      <div>
        <Dialog
            title="Add Pet Form"
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
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{padding: "16 16 16 16", width: 320}}>
              <TextField
                hintText="Name"
                value={this.state.nameValue}
                onChange={this.handleNameChange}
            /><br />
            <TextField
                hintText="Type"
                value={this.state.typeValue}
                onChange={this.handleTypeChange}
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
            </div>
            <div style={{padding: "16 16 16 16", width: 320}}>
              <SelectField value={this.state.genderValue} onChange={this.handleGenderChange} autoWidth={true} floatingLabelText="Select gender" floatingLabelFixed={false}>
                <MenuItem value={'Female'} label="Female" primaryText="This pet is female" />
                <MenuItem value={'Male'} label="Male" primaryText="This pet is male" />
                <MenuItem value={'Other'} label="Other" primaryText="This pet's gender is unknown/other" />
              </SelectField>
              <SelectField value={this.state.ageValue} onChange={this.handleAgeChange} autoWidth={true} floatingLabelText="Select age" floatingLabelFixed={false}>
                <MenuItem value={'Young'} label="Young" primaryText="This pet is considered young" />
                <MenuItem value={'Developed'} label="Developed" primaryText="This pet is considered fully developed" />
                <MenuItem value={'Mature'} label="Mature" primaryText="This pet is considered mature" />
              </SelectField>
              <SelectField value={this.state.sizeValue} onChange={this.handleSizeChange} autoWidth={true} floatingLabelText="Select size" floatingLabelFixed={false}>
                <MenuItem value={'Small'} label="Small" primaryText="This pet is small-sized" />
                <MenuItem value={'Medium'} label="Medium" primaryText="This pet is medium-sized" />
                <MenuItem value={'Large'} label="Large" primaryText="This pet is large-sized" />
              </SelectField>
              <SelectField value={this.state.careValue} onChange={this.handleCareChange} autoWidth={true} floatingLabelText="Select level of care" floatingLabelFixed={false}>
              <MenuItem value={'Minimal'} label="Minimal" primaryText="This pet requires minimal care" />
              <MenuItem value={'Moderate'} label="Moderate" primaryText="This pet requires moderate care" />
              <MenuItem value={'Intensive'} label="Intensive" primaryText="This pet requires intensive care" />
            </SelectField>
            <SelectField value={this.state.energyValue} onChange={this.handleEnergyChange} autoWidth={true} floatingLabelText="Select level of energy" floatingLabelFixed={false}>
              <MenuItem value={'Low'} label="Low" primaryText="This pet is low energy" />
              <MenuItem value={'Medium'} label="Medium" primaryText="This pet is medium energy" />
              <MenuItem value={'High'} label="High" primaryText="This pet is high energy" />
            </SelectField>
            <SelectField value={this.state.trainingValue} onChange={this.handleTrainingChange} autoWidth={true} floatingLabelText="Select level of training" floatingLabelFixed={false}>
              <MenuItem value={'None'} label="None" primaryText="This pet is untrained" />
              <MenuItem value={'Basic'} label="Basic" primaryText="This pet has basic training" />
              <MenuItem value={'Advanced'} label="Advanced" primaryText="This pet has advanced training" />
            </SelectField>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
