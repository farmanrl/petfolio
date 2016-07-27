import firebase from 'firebase';

//Auth

export function authorizeUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebase.auth()
          .signInWithPopup(provider);
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('users/').set({uid});
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
  var petKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid + '/pets').push({
    petKey,
    name,
  });
  firebase.database().ref('petList/' + petKey).set({
    name: name,
    location: location,
    image: image,
    place: uid,
  });
}

export function addPost(petKey, post) {
  var uid = firebase.auth().currentUser.uid;
  var postKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid + '/pets')
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.val().name == petKey) {
                petKey = childSnapshot.val().petKey;
              }
            });
            console.log(petKey);
            firebase.database().ref('petPlaces/' + uid + '/posts/').push({
              postKey,
              post,
              petKey,
            });
          });
}

export function addPhoto(petKey, photo) {
  var uid = firebase.auth().currentUser.uid;
  var photoKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid + '/pets')
                .on('value', (snapshot) => {
                  snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.name == petKey) {
                      petKey = childSnapshot.petKey;
                    }
                  });
                  firebase.database().ref('petPlaces/' + uid + '/photos/').push({
                    photoKey,
                    photo,
                    petKey,
                  });
                });
}

//Storage
