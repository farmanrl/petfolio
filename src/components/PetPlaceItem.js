import React from 'react';

export default class PetPlaceItem extends React.Component {
  render() {
    console.log('image');
    return (
      <img style={{height: 50, width: 50, borderRadius: "50%", marginLeft: "2.5%"}} src={this.props.image}/>
    );
  }
}

PetPlaceItem.propTypes = {
  image: React.PropTypes.string,
};
