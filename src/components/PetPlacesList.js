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
      return (
        <div>
          <h1 style={{paddingLeft: "5%"}}>Pet Places</h1>
          <h4 style={{paddingLeft: "5%"}}>Find adoption centers, agencies, and other adoption opportunities!</h4>
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
