import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavBar = $('#logOut');

const checkLoginStaus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      boardsDiv.removeClass('hide');
      logoutNavBar.removeClass('hide');
      authDiv.addClass('hide');
    } else {
      boardsDiv.addClass('hide');
      logoutNavBar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStaus };
