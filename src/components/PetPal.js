import React from 'react';
import firebase from 'firebase';
import * as firebaseFunctions from '../firebase';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import PetPhotoItem from './PetPhotoItem';

export default class PetPal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      petPlaces: {},
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
  }
  componentWillMount() {
    firebase.database().ref('petPlaces').on(
      'value',
      (snapshot) => {
        this.setState({petPlaces: snapshot.val()});
      }
    );
    firebase.database().ref('photos').on(
      'value',
      (snapshot) => {
        var photos = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().petKey === this.props.petKey) {
            photos.push(childSnapshot.val().image);
          }
        });
        this.setState({photoList: photos});
      }
    );
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleFollow() {
    firebaseFunctions.followPet(this.props.petKey, this.props.name);
  }

  handleAdopt() {
    firebaseFunctions.adoptPet(this.props.petKey, this.props.name, this.props.placeKey);
  }

  render() {
    if (this.state !== null) {
      return (
        <Card containerStyle={{padding: "8 0 8 0", width: "90%", margin: 'auto'}} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
              title={<h1>{this.props.name}</h1>}
              titleStyle={{paddingLeft: 48}}
              subtitle={<div><h3>Located at {this.props.location}</h3>
                             <h3>Available for Adoption!</h3>
                             <h3>Hosted by {this.props.place}</h3></div>}
              subtitleStyle={{paddingLeft: 48}}
              avatar={<img style={{height: 196,
                                   width: 196,
                                   borderStyle: 'solid',
                                   borderWidth: 8,
                                   borderRadius: "50%",
                                   borderColor: '#4CAF50',}}
                 src={this.props.image} />}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardTitle title="Photos" expandable={true}/>
          <CardText expandable={true}>
            <div>
              {this.state.photos &&
               (this.state.photos)
                 .map((photo,index) => (
                   <PetPhotoItem key={index}
                                 photo={this.state.photoList[photo]} />
                 ))}
            </div>
          </CardText>
          <CardActions>
            <FlatButton primary={true} label="Follow" onTouchTap={this.handleFollow} />
            <FlatButton secondary={true} label="Adopt" onTouchTap={this.handleAdopt} />
          </CardActions>
        </Card>
      );
    }
    return null;
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
