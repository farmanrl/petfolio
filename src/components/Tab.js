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
    console.log("value", value);
    console.log("typeof", typeof value);
    if (typeof value !== "string") {
      return;
    }
    this.setState({
      value: value,
    });
  }

  render() {
    console.log("state.value", this.state.value);
    console.log("this should render");
    return (
      <Tabs
          value={this.state.value}
          onChange={this.handleChange}
      >
        <Tab label="Tab A" value="a" >
          <Home />
        </Tab>
        <Tab label="Tab B" value="b">
          <PetPalsList />
        </Tab>
        <Tab label="Tab C" value="c">
          <PetPlacesList />
        </Tab>
      </Tabs>
    );
  }
}
