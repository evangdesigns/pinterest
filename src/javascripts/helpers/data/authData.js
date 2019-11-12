import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import boardsPage from '../../components/boards/boards';


const homeDiv = $('#home');
const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavBar = $('#logOut');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutNavBar.removeClass('hide');
      authDiv.addClass('hide');
      boardsPage.printBoards(user.uid);
    } else {
      boardsDiv.addClass('hide');
      logoutNavBar.addClass('hide');
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
