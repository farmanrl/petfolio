import React from 'react';
import firebase from 'firebase';
import {getPhotoList, getPetList, subscribeHost} from '../firebase';
import PetSubheader from './PetSubheader';
import PhotoSubheader from './PhotoSubheader';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class HostHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      petList: null,
      photoList: null,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleContact = this.handleContact.bind(this);
  }
  componentWillMount() {
    firebase.database().ref('photoList/')
            .on('value', (snapshot) => {
              this.setState({photoList: snapshot.val()});
            });
    firebase.database().ref('petList/')
            .on('value', (snapshot) => {
              this.setState({petList: snapshot.val()});
            });
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleSubscribe() {
    subscribeHost(this.props.hostKey, this.props.name);
  }

  handleContact() {
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
              title={<h1>{this.props.name}</h1>}
              titleStyle={{paddingLeft: 48}}
              subtitle={<div><h3>{this.props.location}</h3>
          <h3>Adoption Agency</h3>
          <h3>{Object.keys(this.props.pets).length} Pets Available for Adoption!</h3></div>}
              subtitleStyle={{paddingLeft: 48}}
              avatar={<img style={{height: 196,
                                   width: 196,
                                   borderRadius: "5%",
                                   borderStyle: 'solid',
                                   borderWidth: 8,
                                   borderColor: '#2196F3',}}
                 src={this.props.image} />}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardTitle title="Available Pets" expandable={true} />
          <CardText expandable={true}>
            <div>
              {this.props.pets && this.state.petList &&
               (Object.keys(this.props.pets))
                 .map((pet,index) => (
                   <PetSubheader key={index}
                                 image={this.state.petList[pet].image} />
                 ))}
            </div>
          </CardText>
          <CardTitle title="Photos" expandable={true} />
          <CardText expandable={true} >
            <div>
              {this.state.photoList && this.props.photos &&
               (Object.keys(this.props.photos))
                 .map((photo,index) => (
                   <PhotoSubheader
                       key={index}
                       photo={this.state.photoList[photo].image} />
                 ))}
            </div>
          </CardText>
          <CardActions>
            <FlatButton
                primary={true}
                label="Subscribe"
                onTouchTap={this.handleSubscribe} />
            <FlatButton
                secondary={true}
                label="Contact"
                onTouchTap={this.handleContact} />
          </CardActions>
        </Card>
      );
    }
    return null;
  }
}

HostHeader.propTypes = {
  name: React.PropTypes.string,
  hostKey: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
  pets: React.PropTypes.object,
  photos: React.PropTypes.object,
};
