import React from 'react';

export default class PetPhotoItem extends React.Component {
  render() {
    return (
      <img style={{height: 200, width: 200, marginLeft: "2.5%"}} src={this.props.photo}/>
    );
  }
}

PetPhotoItem.propTypes = {
  photo: React.PropTypes.string,
};
