import React from 'react';
import Login from './Login';
import AddPlaceForm from './AddPlaceForm';
import AddPetForm from './AddPetForm';

export default class Home extends React.Component {
  render() {
    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", paddingBottom: 30, marginTop: 25}}>
        <Login />
        <AddPlaceForm />
        <AddPetForm />
      </div>
    );
  }
}
