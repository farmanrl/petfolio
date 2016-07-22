import React from 'react';
import firebase from 'firebase';
import PetPal from './PetPal';

export default class PetPalsList extends React.Component {
  componentDidMount() {
    firebase.database().ref('petList').on(
      'value',
      (snapshot) => {
        this.setState({petList: snapshot.val()});
      }
    );
  }
  render() {
    if (this.state !== null) {
      return (
        <div>
          <h1>PETS</h1>
          {Object.keys(this.state.petList).map((pet, index) => (
             <PetPal key={index}
                     name={this.state.petList[pet].name}
                     location={this.state.petList[pet].location}
                     image={this.state.petList[pet].image} />
           ))}
        </div>
      );
    }
    return null;
  }
}
