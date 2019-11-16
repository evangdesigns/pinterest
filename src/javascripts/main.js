import 'bootstrap';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import naveyOut from './components/navey/navey';
import homePage from './components/home/home';
import '../styles/main.scss';

const init = () => {
  homePage.printHome();
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  naveyOut.logoutEvent();
};

init();
