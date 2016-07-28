import React from 'react';
import firebase from 'firebase';
import * as firebaseFunctions from '../firebase';
import {Button} from 'react-bootstrap';

export default class PetPal extends React.Component {
  componentDidMount() {
    firebase.database().ref('petPlaces').on(
      'value',
      (snapshot) => {
        this.setState({petPlaces: snapshot.val()});
      }
    );
  }
  render() {
    return (
      <div style={{display: 'flex',
                   justifyContent: 'space-between',
                   padding: '2.5% 5% 2.5% 5%',
                   alignItems: 'center',
                   borderBottomStyle: 'inset',}}>
        <div style={{display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center'}}>
          <div style={{display: 'flex',
                       justifyContent: 'flex-start'}}>
            <img style={{height: 200,
                         width: 200,
                         borderRadius: '50%',
                         borderStyle: 'solid',
                         borderWidth: 10,
                         borderColor: '#4CAF50',}}
                 src={this.props.image} />
        <div style={{paddingLeft: '5%'}}>
          <div style={{display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',}}>
            <div style={{display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         width: 600}}>
              <h1>{this.props.name}</h1>
              <h3 style={{marginTop: 12}}>
                Available for Adoption!
              </h3>
              <h3 style={{marginTop: 12}}>
                Located in {this.props.location}
              </h3>
              <h3 style={{marginTop: 12}}>
                Hosted by {this.props.place}
              </h3>
            </div>
          </div>
        </div>
          </div>
        </div>
        <div style={{display: 'flex',
                     flexWrap: 'wrap',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     width: '20%',
                     height: '15%'}}>
          <Button bsStyle='primary'
                  bsSize='large'
                  onClick={() => firebaseFunctions
                    .followPet(this.props.petKey, this.props.name)}>
            Follow
          </Button>
          <Button
              bsStyle='success'
              bsSize='large'
              onClick={() => firebaseFunctions
                .adoptPet(this.props.petKey, this.props.name, this.props.placeKey)}>
            Adopt
          </Button>
        </div>
      </div>
    );
  }
}

PetPal.propTypes = {
  petKey: React.PropTypes.string,
  placeKey: React.PropTypes.string,
  name: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
  place: React.PropTypes.string,
};
