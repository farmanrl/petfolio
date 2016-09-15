import React from 'react';
import firebase from 'firebase';
import {getHostList} from '../firebase';
import HostHeader from './HostHeader';

export default class HostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hostList: null};
  }
  componentWillMount() {
    firebase.database().ref('hostList/')
            .on('value', (snapshot) => {
              var hostList = snapshot.val();
              this.setState({hostList: hostList});
            });
  }
  render() {
    if (this.state.hostList !== null) {
      console.log('hostlist',this.state.hostList);
      return (
        <div>
          <div style={{paddingLeft: "5%", paddingBottom: 8}}>
            <h1>Pet Hosts</h1>
            <h4>Find adoption centers, agencies, and other adoption opportunities!</h4>
          </div>
          {Object.keys(this.state.hostList).map((host, index) => (
             <HostHeader
                 key={index}
                 hostKey={host}
                 name={this.state.hostList[host].name}
                 location={this.state.hostList[host].location}
                 image={this.state.hostList[host].image}
                 pets={this.state.hostList[host].pets}
                 photos={this.state.hostList[host].photos}
             />
           ))}
        </div>
      );
    }
    return null;
  }
}
