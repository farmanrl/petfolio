import React from 'react';

export default class AddPlace extends React.Component {
  constructor() {
    super();
    this.state = {clicked: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({clicked: true});
  }
  render () {
    return (
      <div>
        <button onClick={this.handleClick}>Add Pet Place</button>
      </div>
    );
  }
}
