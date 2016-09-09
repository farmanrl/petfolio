import React from 'react';
import {getPetList, getHostList} from '../firebase';
import PetHeader from './PetHeader';

export default class PetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {petList: null, hostList: null};
  }
  componentWillMount() {
    var petList = getPetList();
    var hostList = getHostList();
    this.setState({petList: petList, hostList: hostList});
  }
  render() {
    if (this.state.petList !== null && this.state.hostList !== null) {
      console.log(this.state);
      return (
        <div>
          <div style={{paddingLeft: "5%", paddingBottom: 8}}>
            <h1>Pet Pals</h1>
            <h4>Connect with pets in need that meet your needs</h4>
          </div>
          {Object.keys(this.state.petList).map((pet, index) => (
             <PetHeader
                 key={index}
                 petKey={pet}
                 name={this.state.petList[pet].name}
                 location={this.state.petList[pet].location}
                 image={this.state.petList[pet].image}
                 host={this.state.hostList[this.state.petList[pet].place].name}
                 hostKey={this.state.petList[pet].place}
             />
           ))}
        </div>
      );
    }
    return null;
  }
}
