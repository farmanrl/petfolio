import React from 'react';
import * as firebaseFunctions from '../firebase';
import FlatButton from 'material-ui/FlatButton';

export default class Login extends React.Component {
  render () {
    return (
      <FlatButton label="Login" onTouchTap={() => firebaseFunctions.authorizeUser()} />
    );
  }
}
