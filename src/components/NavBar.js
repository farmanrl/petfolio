import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {signOut, authorizeUser} from '../firebase';

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <AppBar
            title="Petfolio"
            children={
              <div style={{display: 'flex', height: 'inherit', alignItems: 'center'}}>
                <RaisedButton label="User" onTouchTap={() => authorizeUser()} />
                <RaisedButton label="Sign out" onTouchTap={() => signOut()} />

              </div>
            }
        />
      </div>
    );
  }
}
