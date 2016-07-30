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
      console.log("PetPlacesList State", this.state);
      return (
        <div>
          <div style={{paddingLeft: "5%", paddingBottom: 8}}>
            <h1>Pet Hosts</h1>
            <h4>Find adoption centers, agencies, and other adoption opportunities!</h4>
          </div>
          {Object.keys(this.state.petPlaces).map((place, index) => (
             <PetPlace
                 key={index}
                 placeKey={place}
                 name={this.state.petPlaces[place].name}
                 location={this.state.petPlaces[place].location}
                 image={this.state.petPlaces[place].image}
                 pets={this.state.petPlaces[place].pets}
                 photos={this.state.petPlaces[place].photos}
             />
           ))}
        </div>
      );
    }
    return null;
  }
}
