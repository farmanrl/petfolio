import firebase from 'firebase';

//Auth

export function authorizeUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebase.auth()
          .signInWithPopup(provider);
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + uid + '/').set({email: firebase.auth().currentUser.email});
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
  firebase.database().ref('petPlaces/' + uid + '/pets/' + petKey).set({
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
  firebase.database().ref('petPlaces/' + uid + '/pets')
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.val().name == petKey) {
                petKey = childSnapshot.val().petKey;
              }
            });
            console.log(petKey);
            firebase.database().ref('petPlaces/' + uid + '/posts/').push({
              post,
              petKey,
            });
          });
}

export function addPhoto(petKey, photo) {
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('petPlaces/' + uid + '/pets')
                .on('value', (snapshot) => {
                  snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.name == petKey) {
                      petKey = childSnapshot.petKey;
                    }
                  });
                  firebase.database().ref('petPlaces/' + uid + '/photos/').push({
                    photo,
                    petKey,
                  });
                });
}

export function followPet(petKey, name) {
  console.log('following');
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + uid + '/followedPets/' + petKey + '/').set({name: name});
}

export function adoptPet(petKey, name, placeKey) {
  console.log('adopting');
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('petPlaces/' + uid + '/pets/' + petKey).set({
    name: name
  });
  firebase.database().ref('petList/' + petKey).update({
    place: uid
  });
  firebase.database().ref('petPlaces/' + placeKey + '/pets/' + petKey + '/').remove();
}

//Storage
