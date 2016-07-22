import Petfolio from '../petfolio';

var app = document.createElement('div');
var firebaseConfig = {
  apiKey: "AIzaSyCh5cEE6J6QtzDytvJazboSobAfwL0_RM8",
  authDomain: "petfolio-62d47.firebaseapp.com",
  databaseURL: "https://petfolio-62d47.firebaseio.com",
  storageBucket: "",
};

document.body.appendChild(app);
Petfolio.init({
  firebaseConfig,
});
