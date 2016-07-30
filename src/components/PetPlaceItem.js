import React from 'react';

export default class PetPlaceItem extends React.Component {
  render() {
    return (
      <img style={{height: 100, width: 100, borderRadius: "50%", marginLeft: "2.5%"}} src={this.props.image}/>
    );
  }
}

PetPlaceItem.propTypes = {
  image: React.PropTypes.string,
};
