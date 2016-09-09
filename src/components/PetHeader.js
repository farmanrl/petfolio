import React from 'react';
import {getHostList, getPetPhotos, followPet, adoptPet} from '../firebase';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
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
    var hostList = getHostList();
    var photos = getPetPhotos(this.props.petKey);
    this.setState({hostList: hostList, photos: photos});
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
              title={<h1>{this.props.name}</h1>}
              titleStyle={{paddingLeft: 48}}
              subtitle={<div><h3>Located at {this.props.location}</h3>
                             <h3>Available for Adoption!</h3>
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
          <CardTitle title="Photos" expandable={true}/>
          <CardText expandable={true}>
            <div>
              {this.state.photos &&
               (this.state.photos)
                 .map((photo,index) => (
                   <PhotoSubheader
                       key={index}
                       photo={this.state.photos[photo]} />
                 ))}
            </div>
          </CardText>
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
  host: React.PropTypes.string,
  hostKey: React.PropTypes.string,
};
