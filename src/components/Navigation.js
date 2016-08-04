import React from 'react';
import firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebaseFunctions from '../firebase';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <AppBar
            title="Petfolio"
            children={
              <div style={{display: 'flex', height: 'inherit', alignItems: 'center'}}>
                <RaisedButton label="User" onTouchTap={() => firebaseFunctions.authorizeUser()} />
                <RaisedButton label="Sign out" onTouchTap={() => firebaseFunctions.signOut()} />

              </div>
            }
        />
      </div>
    );
  }
}
