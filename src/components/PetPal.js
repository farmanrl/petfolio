import React from 'react';
import {Button, PageHeader} from 'react-bootstrap';
export default class PetPal extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>
          <div style={{display: "flex"}}>
            <div style={{height: "25%", paddingLeft: "5%"}}>
              <img height="100%" src={this.props.image} />
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{display: "flex", flexDirection: "column", paddingLeft: "2.5%", width: 400}}>
                <p>{this.props.name}</p>
                <small>Available for Adoption!</small>
                <small style={{paddingTop: 10}}>Located in {this.props.location}</small>
              </div>
              <div style={{marginLeft: 100}}>
                <Button bsStyle="primary" bsSize="large">Follow</Button>
              </div>
              <div style={{marginLeft: 100}}>
                <Button bsStyle="success" bsSize="large">Adopt</Button>
              </div>
            </div>
          </div>
        </PageHeader>
      </div>
    );
  }
}

PetPal.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string,
  location: React.PropTypes.string,
  image: React.PropTypes.string,
};
