import React from 'react';
import firebase from 'firebase';
import PetPal from './PetPal';

export default class PetPalsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {petList: {}, petPlaces: {}};
  }
  componentDidMount() {
    firebase.database().ref('petList').on(
      'value',
      (snapshot) => {
        this.setState({petList: snapshot.val()});
      }
    );
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
          <h1 style={{paddingLeft: "5%"}}>Pet Pals</h1>
          <h4 style={{paddingLeft: "5%"}}>Connect with pets in need that meet your needs</h4>
          {Object.keys(this.state.petList).map((pet, index) => (
             <PetPal key={index}
                     petKey={pet}
                     name={this.state.petList[pet].name}
                     location={this.state.petList[pet].location}
                     image={this.state.petList[pet].image}
                     place={this.state.petPlaces[this.state.petList[pet].place].name}
                     placeKey={this.state.petList[pet].place}
             />
           ))}
        </div>
      );
    }
    return null;
  }
}
