import React from 'react';
import firebase from 'firebase';
import * as firebaseFunctions from '../firebase';
import PetPlaceItem from './PetPlaceItem';
import PetPhotoItem from './PetPhotoItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

export default class PetPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      petList: {},
      photoList: null,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleContact = this.handleContact.bind(this);
  }
  componentWillMount() {
    firebase.database().ref('petList').on(
      'value',
      (snapshot) => {
        this.setState({petList: snapshot.val()});
      }
    );
    firebase.database().ref('photos').on(
      'value',
      (snapshot) => {
        this.setState({photoList: snapshot.val()});
      }
    );
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleSubscribe() {
    firebaseFunctions.subscribePlace(this.props.placeKey, this.props.name);
  }

  handleContact() {
  }

  render() {
    if (this.state !== null) {
      console.log("PetPlace state", this.state);
      return (
        <Card containerStyle={{padding: "8 0 8 0", width: "90%", margin: 'auto'}} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
              {this.props.pets &&
               (Object.keys(this.props.pets))
                 .map((pet,index) => (
                   <PetPlaceItem key={index}
                                 image={this.state.petList[pet].image} />
                 ))}
            </div>
          </CardText>
          <CardTitle title="Photos" expandable={true}/>
          <CardText expandable={true}>
            <div>
              {this.state.photoList &&
               (Object.keys(this.props.photos))
                 .map((photo,index) => (
                   <PetPhotoItem key={index}
                                 photo={this.state.photoList[photo].image} />
                 ))}
            </div>
          </CardText>
          <CardActions>
            <FlatButton primary="true" label="Subscribe" onTouchTap={this.handleSubscribe} />
            <FlatButton secondary="true" label="Contact" onTouchTap={this.handleContact} />
          </CardActions>
        </Card>
      );
    }
    return null;
  }
}

PetPlace.propTypes = {
  name: React.PropTypes.string,
  placeKey: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
  pets: React.PropTypes.object,
  photos: React.PropTypes.object,
};
