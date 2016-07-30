import React from 'react';
import firebase from 'firebase';
import * as firebaseFunctions from '../firebase';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class AddPhotoForm extends React.Component {
  componentDidMount() {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('petPlaces/' + uid + '/pets/').on(
      'value',
      (snapshot) => {
        var petKeys = {};
        console.log('snapshot',snapshot.val());
        snapshot.forEach((childSnapshot) => {
          console.log('childsnapshot', childSnapshot.val());
          petKeys[childSnapshot.val().name] = childSnapshot.key;
        });
        this.setState({petKeys: petKeys});
      }
    );
  }
  constructor(props) {
    super(props);
    this.state = {petKeys: {}, petValue: null, photoValue: null};
    this.handlePetChange = this.handlePetChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
  }
  handlePetChange(value) {
    this.setState({petValue: value});
  }
  handlePhotoChange(value) {
    this.setState({photoValue: value});
  }
  handleSubmit() {
    firebaseFunctions.addPhoto(this.state.petKeys[this.state.petValue], this.state.photoValue);
  }
  render() {
    return (
      <div style={{padding: "16 16 16 16", width: 320}}>
        <TextField
            hintText="Add a photo"
            onChange={this.handlePetChange}
        /><br />
        <AutoComplete
            floatingLabelText="Tag a pet"
            filter={AutoComplete.fuzzyFilter}
            dataSource={Object.keys(this.state.petKeys)}
            maxSearchResults={5}
            onNewRequest={this.handlePetChange}
        />
        <FlatButton label="Submit" onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}
