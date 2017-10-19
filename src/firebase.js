import firebase from 'firebase';

//Auth

export function authorizeUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  firebase.auth()
          .signInWithPopup(provider);
  var uid = getUid();

  firebase.database().ref('users/' + uid + '/')
          .set({email: firebase.auth().currentUser.email});
}

export function signOut() {
  firebase.auth().signOut().then(() => {
    console.log('Signed Out');
  }, (error) => {
    console.error('Sign Out Error', error);
  });
}

export function getUid() {
  var uid = firebase.auth().currentUser.uid;
  return uid;
}

export function getHostKey() {
  var uid = getUid();
  firebase.database()
          .ref('users/' + uid + '/hostKey')
          .once('value')
          .then((snapshot) => {
            console.log(snapshot.val());
            return snapshot.val();
          });
}

export function getHostList() {
  var hostList = firebase.database().ref('hostList/')
                        .on('value', (snapshot) => {
                          return snapshot.val();
                        });
  return hostList;
}

export function getPetList() {
  var petList = firebase.database().ref('petList/')
                         .on('value', (snapshot) => {
                           return snapshot.val();
                         });
  return petList;
}

export function getPhotoList() {
  firebase.database().ref('photoList/')
                        .on('value', (snapshot) => {
                          return snapshot.val();
                        });
  return petList;
}

export function getPetPhotos(petKey) {
  firebase.database().ref('photoList').on(
    'value',
    (snapshot) => {
      var photos = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().petKey === petKey) {
          photos.push(childSnapshot.val().image);
        }
      });
      return photos;
    }
  );
}

export function getHostPetKeys() {
  var hostKey = getHostKey();
  var petKeys = firebase.database().ref('/hostList/' + hostKey + '/pets/').on(
    'value',
    (snapshot) => {
      var petKeys = {};
      snapshot.forEach((childSnapshot) => {
        petKeys[childSnapshot.val().name] = childSnapshot.key;
      });
      return petKeys;
    }
  );
  return petKeys;
}

export function addHost(name, type, location, image, description) {
  var hostKey = getUid();
  var hostData = {
    name: name,
    type: type,
    location: location,
    image: image,
    description: description
  };
  var updates = {};
  updates['/hostList/' + hostKey] = hostData;
  updates['/users/'] = hostKey;
  firebase.database().ref().update(updates);
}

export function addPet(
  name, type, location, image, description, age, gender, size,
  care, energy, training
) {
  var hostKey = getUid();
  var petKey = firebase.database().ref()
                       .child('hostList/' + hostKey + '/')
                       .push().key;
  console.log(hostKey, petKey);
  var petData = {
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
    host: hostKey,
  };
  console.log('petData', petData);
  var updates = {};
  updates['/petList/' + petKey] = petData;
  updates['/hostList/' + hostKey + '/pets/' + petKey] = name;
  firebase.database().ref().update(updates);
}

export function addPhoto(petKey, image) {
  var hostKey = getUid();
  var photoKey = firebase.database().ref()
                         .child('hostList/' + hostKey + '/')
                         .push().key;
  var photoData = {
    hostKey: hostKey,
    image: image,
    petKey: petKey
  };
  firebase.database()
          .ref('hostList/' + hostKey + '/pets')
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if (childSnapshot.name == petKey) {
                photoData.petKey = childSnapshot.petKey;
              }
            });
            var updates = {};
            updates['/photoList/' + photoKey] = photoData;
            updates['/hostList/' + hostKey + '/photos/' + photoKey] = petKey;
            firebase.database().ref().update(updates);
          });
}

export function followPet(petKey, name) {
  var uid = getUid();
  var updates = {};
  updates['/users/' + uid + '/followedPets/' + petKey] = name;
  firebase.database().ref().update(updates);
}

export function adoptPet(petKey, name, hostKey) {
  var newHostKey = getHostKey();
  var updates = {};
  updates['/hostList/' + newHostKey + '/pets/' + petKey] = name;
  updates['/petList/' + petKey + '/host'] = hostKey;
  firebase.database().ref().update(updates);
  firebase.database().ref('hostList/' + hostKey + '/pets/' + petKey + '/').remove();
}

export function subscribeHost(hostKey, name) {
  var uid = getUid;
  var updates = {};
  updates['/users/' + uid + '/followedHosts/' + hostKey] = name;
  firebase.database().ref().update(updates);
}

//Storage
