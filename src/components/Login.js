import React from 'react';
import * as firebase from '../firebase';

export default class Login extends React.Component {
  render () {
    return (
      <button onClick={() => firebase.authorizeUser()}>Login</button>
    );
  }
}
