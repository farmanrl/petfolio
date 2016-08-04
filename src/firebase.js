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

export function signOut() {
  firebase.auth().signOut().then(() => {
    console.log('Signed Out');
  }, (error) => {
    console.error('Sign Out Error', error);
  });
}

export function getUid() {
  return firebase.auth().currentUser.uid;
}
//Database

export function getHost() {
  var uid = getUid();
  firebase.database().ref('users/' + uid + '/host/').on(
    'value',
    (snapshot) => {
      return snapshot.val().placeKey;
    }
  );
}

export function addPetPlace(name, location, image) {
  var uid = firebase.auth().currentUser.uid;
  var placeKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid).set({
    name: name,
    location: location,
    image: image,
  });
  firebase.database().ref('users/' + uid + '/host/' + placeKey).set({name: name});
}

export function addPetProfile(name, type, location, image, description, age, gender, size, care, energy, training) {
  var uid = firebase.auth().currentUser.uid;
  var petKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  firebase.database().ref('petPlaces/' + uid + '/pets/' + petKey).set({
    name,
  });
  firebase.database().ref('petList/' + petKey).set({
    name: name,
    type: type,
    location: location,
    description: description,
    image: image,
    age: age,
    gender: gender,
    size: size,
    energy: energy,
    care: care,
    training: training,
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

export function addPhoto(petKey, image) {
  var photoKey = firebase.database().ref().child('petPlaces/' + uid + '/').push().key;
  var uid = firebase.auth().currentUser.uid;
  firebase.database()
          .ref('petPlaces/' + uid + '/pets')
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.name == petKey) {
                petKey = childSnapshot.petKey;
              }
            });
            firebase.database()
                    .ref('petPlaces/' + uid + '/photos/' + photoKey)
                    .set({
                      petKey,
                    });
            firebase.database()
                    .ref('photos/' + photoKey + '/')
                    .set({
                      uid,
                      image,
                      petKey,
                    });
          });
}

export function followPet(petKey, name) {
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + uid + '/followedPets/' + petKey + '/').set({name: name});
}

export function adoptPet(petKey, name, placeKey) {
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('petPlaces/' + uid + '/pets/' + petKey).set({
    name: name
  });
  firebase.database().ref('petList/' + petKey).update({
    place: uid
  });
  firebase.database().ref('petPlaces/' + placeKey + '/pets/' + petKey + '/').remove();
}

export function subscribePlace(placeKey, name) {
  var uid = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + uid + '/followedPlaces/' + placeKey + '/').set({name: name});
}

//Storage
