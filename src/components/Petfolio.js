import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import Navigation from './Navigation';
import Profile from './Profile';
import AddPetForm from './AddPetForm';
import AddPlaceForm from './AddPlaceForm';
import Login from './Login';

import Tab from './Tab';

export default class Petfolio extends React.Component {
  render() {
    return (
      <div>
        <img style={{height: 200, paddingLeft: 100}} src="http://i.imgur.com/HcCeSUu.png"/>
        <h1 style={{paddingLeft: 100}}> The Adaptive Adoption Network </h1>
        <Navigation />
        <Tab />
      </div>
    );
  }
}
