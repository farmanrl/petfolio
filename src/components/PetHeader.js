import React from 'react';
import firebase from 'firebase';
import {getHostList, getPetPhotos, followPet, adoptPet} from '../firebase';
import {Card, CardMedia, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PhotoSubheader from './PhotoSubheader';

export default class PetHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      hostList: null,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
  }

  componentWillMount() {
    firebase.database().ref('hostList/')
            .on('value', (snapshot) => {
              this.setState({hostList: snapshot.val()});
            });
    firebase.database().ref('photoList/').on(
      'value',
      (snapshot) => {
        var photos = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().petKey === this.props.petKey) {
            photos.push(childSnapshot.val().image);
          }
        });
        this.setState({photos: photos});
      }
    );
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleFollow() {
    followPet(this.props.petKey, this.props.name);
  }

  handleAdopt() {
    adoptPet(this.props.petKey, this.props.name, this.props.hostKey);
  }

  render() {
    if (this.state !== null) {
      return (
        <Card
            containerStyle={{
              padding: "8 0 8 0",
              width: "90%",
              margin: 'auto'
            }}
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}>
          <CardHeader
              title={<h1>{this.props.name} - ({this.props.type})</h1>}
              titleStyle={{paddingLeft: 48}}
              subtitle={<div><h3>Located at {this.props.location}</h3>
                             <h3>{this.props.description}</h3>
                             <h3>Hosted by {this.props.host}</h3></div>}
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
          <CardMedia expandable={true}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Gender</h3>
                <h4>{this.props.gender}</h4>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Age</h3>
                <h4>{this.props.age}</h4>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Size</h3>
                <h4>{this.props.size}</h4>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Energy</h3>
                <h4>{this.props.energy}</h4>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Care</h3>
                <h4>{this.props.care}</h4>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <h3>Training</h3>
                <h4>{this.props.training}</h4>
              </div>

            </div>
          </CardMedia>
          <CardTitle title="Photos" expandable={true}/>
          <CardMedia expandable={true}>
            <div>
              {this.state.photos &&
               (this.state.photos)
                 .map((photo,index) => (
                   <PhotoSubheader
                       key={index}
                       photo={this.state.photos[photo]} />
                 ))}
            </div>
          </CardMedia>
          <CardActions>
            <FlatButton
                primary={true}
                label="Follow"
                onTouchTap={this.handleFollow} />
            <FlatButton
                secondary={true}
                label="Adopt"
                onTouchTap={this.handleAdopt} />
          </CardActions>
        </Card>
      );
    }
    return null;
  }
}

PetHeader.propTypes = {
  petKey: React.PropTypes.string,
  name: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
  description: React.PropTypes.string,
  gender: React.PropTypes.string,
  age: React.PropTypes.string,
  size: React.PropTypes.string,
  energy: React.PropTypes.string,
  care: React.PropTypes.string,
  training: React.PropTypes.string,
  type: React.PropTypes.string,
  host: React.PropTypes.string,
  hostKey: React.PropTypes.string,
};
