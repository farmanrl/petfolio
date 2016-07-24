import React from 'react';
import * as firebaseAuth from '../firebase';
import firebase from 'firebase';
import {Button} from 'react-bootstrap';

export default class Login extends React.Component {
  render () {
    return (
      <span>
        <Button bsStyle="info"style={{height: 50}} onClick={() => firebaseAuth.authorizeUser()}>Login</Button>
      </span>
    );
  }
}
