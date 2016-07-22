import React from 'react';
import firebase from 'firebase';
import PetPlace from './PetPlace';

export default class PetPlacesList extends React.Component {
  componentDidMount() {
    firebase.database().ref('petPlaces').on(
      'value',
      (snapshot) => {
        this.setState({petPlaces: snapshot.val()});
      }
    );
  }
  render() {
    if (this.state !== null) {
      console.log(this.state.petPlaces);
      return (
        <div>
          <h1>PLACES</h1>
          {Object.keys(this.state.petPlaces).map((place, index) => (
             <PetPlace
                 key={index}
                 name={this.state.petPlaces[place].name}
                 location={this.state.petPlaces[place].location}
                 image={this.state.petPlaces[place].image} />
           ))}
        </div>
      );
    }
    console.log("null");
    return null;
  }
}
