import firebase from 'firebase';

//Auth

export function authorizeUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebase.auth()
          .signInWithPopup(provider);
}

//Database

export function addPetPlace(name, location) {
  var newPlaceKey = firebase.database().ref().child('petPlaces').push().key;
  firebase.database().ref('petPlaces/' + newPlaceKey).set({
    name: name,
    location: location,
  });
}

export function addPetProfile(uid, petPlace, name, location) {
  var petData = {
    petPlace: petPlace,
    uid: uid,
    name: name,
    location: location
  };

  var newPetKey = firebase.database().ref().child('petList').push().key;

  var updates = {};
  updates['/petList/' + newPetKey] = petData;
  updates['/petPlaces/pets/' + uid + '/' + newPetKey] = petData;

  return firebase.database().ref().update(updates);
}

//Storage

export function uploadPhoto(image) {
  var storageRef = firebase.storage().ref();
}
