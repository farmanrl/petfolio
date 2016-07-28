import React from 'react';
import firebase from 'firebase';
import PetPlaceItem from './PetPlaceItem';
import {Button} from 'react-bootstrap';

export default class PetPlace extends React.Component {
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
      console.log(this.props.pets);
      return (
        <div style={{display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     padding: "2.5% 5% 2.5% 5%",
                     borderBottomStyle: 'inset',}}>
          <div style={{display: "flex",
                       justifyContent: "space-between",
                       alignItems: "center"}}>
            <div style={{display: "flex",
                         justifyContent: "flex-start"}}>
              <img style={{height: 200,
                           width: 200,
                           borderStyle: "outset",
                           borderRadius: "5%",
                           borderWidth: 10,
                           borderColor: "#2196F3",}}
                   src={this.props.image} />
              <div style={{paddingLeft: "5%"}}>
                <div style={{display: "flex",
                             justifyContent: "space-around",
                             alignItems: "center",}}>
                    <div style={{display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "center",
                                 width: 600}}>
                      <h1>{this.props.name}</h1>
                      <h3 style={{marginTop: 12}}>
                        {Object.keys(this.props.pets).length} Pets available for Adoption!
                      </h3>
                      <h3 style={{marginTop: 12}}>
                        Located in {this.props.location}
                      </h3>
                  </div>
                </div>
                <div>
                  {this.props.pets &&
                   (Object.keys(this.props.pets))
                     .map((pet,index) => (
                       <PetPlaceItem key={index}
                                     image={this.state.petList[pet].image} />
                     ))}
                </div>
              </div>
            </div>
          </div>
            <div style={{display: 'flex',
                         flexWrap: "wrap",
                         justifyContent: 'space-between',
                         alignItems: "center",
                         width: '20%',
                         height: "15%"}}>
              <Button bsStyle="primary" bsSize="large">Subscribe</Button>
              <Button bsStyle="success" bsSize="large">Contact</Button>
          </div>
        </div>
      );
    }
    return null;
  }
}
PetPlace.propTypes = {
  name: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
  pets: React.PropTypes.object,
};
