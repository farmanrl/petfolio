import React from 'react';
import * as firebase from '../firebase';

export default class AddPet extends React.Component {
  render () {
    return (
      <button onClick={firebase.writePetProfile(1234, "Carduner Adoption Center", "Seattle, Washington")}>Add Pet</button>
    );
  }
}
