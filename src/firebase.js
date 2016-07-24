import firebase from 'firebase';

//Auth

export function authorizeUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebase.auth()
          .signInWithPopup(provider);
}

//Database

export function addPetPlace(name, location, image) {
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('petPlaces/' + uid).set({
    name: name,
    location: location,
    image: image,
  });
}

export function addPetProfile(name, location, image) {
  var uid = firebase.auth().currentUser.uid;
  var newPetKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid + '/' + newPetKey).set({
    name: name,
    location: location,
    image: image,
  });
  firebase.database().ref('petList/' + newPetKey).set({
    name: name,
    location: location,
    image: image,
    place: uid,
  });
}

//Storage
