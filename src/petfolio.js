import ReactDOM from 'react-dom';
import React from 'react';
import firebase from 'firebase';

import Petfolio from './components/Petfolio.js';

export default {
  init({firebaseConfig}) {
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
    } else {
      console.warn("Configure firebase before initializing!");
    }
    ReactDOM.render(
      <Petfolio />, document.getElementById('root')
    );
  }
};
