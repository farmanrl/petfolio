import React from 'react';
import * as firebase from '../firebase';
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class AddPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {petValue: '', postValue: ''};
    this.handlePetChange = this.handlePetChange.bind(this);
    this.handlePostChange = this.handlePostChange.bind(this);
  }
  handlePetChange(event) {
    this.setState({petValue: event.target.value});
  }
  handlePostChange(event) {
    this.setState({postValue: event.target.value});
  }
  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Add a Pet Post</ControlLabel>
            <FormControl
                type="text"
                value={this.state.petValue}
                placeholder="Tag a pet"
                onChange={this.handlePetChange}
            />
            <FormControl
                type="text"
                value={this.state.postValue}
                placeholder="Enter post"
                onChange={this.handlePostChange}
            />
          </FormGroup>
        </form>
        <Button onClick={() => firebase.addPost(this.state.petValue, this.state.postValue)}>Add Pet Post</Button>
      </div>
    );
  }
}
