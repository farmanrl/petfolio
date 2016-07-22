import React from 'react';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';
import AddPet from '../components/AddPet';
import AddPlaceForm from '../components/AddPlaceForm';
import Login from '../components/Login';
import Tab from '../components/Tab';
export default class Petfolio extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Tab />
        <Login />
      </div>
    );
  }
}
