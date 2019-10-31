import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import liBtn from './li_google.jpg';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="googleAuth">
    <img src=${liBtn} alt="Login with Your Google Account">
  </button>
  `;
  utilities.printToDom('auth', domString);
  $('#googleAuth').click(signMeIn);
};

export default { loginButton };
