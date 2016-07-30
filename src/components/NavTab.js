import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Home from './Home';
import PetPalsList from './PetPalsList';
import PetPlacesList from './PetPlacesList';

export default class NavTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <Tabs
          value={this.state.value}
          onChange={this.handleChange}
      >
        <Tab label="Pet Home" value="a" >
          <Home />
        </Tab>
        <Tab label="Pet Pals" value="b">
          <PetPalsList />
        </Tab>
        <Tab label="Pet Hosts" value="c">
          <PetPlacesList />
        </Tab>
      </Tabs>
    );
  }
}
