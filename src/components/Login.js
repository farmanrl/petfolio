import React from 'react';
import * as firebase from '../firebase';
import {Button} from 'react-bootstrap';

export default class Login extends React.Component {
  render () {
    return (
      <Button style={{height: 50}}onClick={() => firebase.authorizeUser()}>Login</Button>
    );
  }
}
