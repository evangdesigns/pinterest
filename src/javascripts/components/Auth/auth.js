import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import liBtn from './li_google.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `
  <center>
    <button id="googleAuth" class="btn btn-link">
      <img src=${liBtn} alt="Login with Your Google Account">
    </button>
  </center>
  `;
  utilities.printToDom('auth', domString);
  $('#googleAuth').click(signMeIn);
};

export default { loginButton };
