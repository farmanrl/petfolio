import ReactDOM from 'react-dom';
import React from 'react';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Petfolio from './components/Petfolio.js';

export default {
  init({firebaseConfig}) {
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
    } else {
      console.warn("Configure firebase before initializing!");
    }
    injectTapEventPlugin();
    ReactDOM.render(
      <Petfolio />, document.getElementById('root')
    );
  }
};
