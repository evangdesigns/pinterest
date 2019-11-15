import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boards from '../../helpers/data/boardsData';
import pinData from '../../helpers/data/pinData';
import iBoard from '../board/board';
import './boards.scss';

const goToBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('view-')[1];
  iBoard.buildBoard(boardId);
};

const deleteBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('delete-')[1];
  boards.deleteBoard(boardId)
    .then(() => {
      pinData.getPins(boardId)
        .then((pins) => {
          pins.forEach((p) => {
            pinData.deletePin(p.id);
          });
        });
      firebase.auth().onAuthStateChanged((user) => {
        // eslint-disable-next-line no-use-before-define
        printBoards(user.uid);
      });
    })
    .catch((error) => console.error(error));
};

const printBoards = (uid) => {
  boards.getBoards(uid)
    .then((boardId) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<div id="boards-section" class="d-flex flex-wrap justify-content-center">';
      boardId.forEach((board) => {
        domString += `<div class="card col-4">
        <h3 class="text-center">${board.name}</h3>
        <button type="button" class="btn btn-danger view-board" id="view-${board.id}">VIEW BOARD</button>
        <button type="link" class="btn btn-link delete-board" id="delete-${board.id}">DELETE BOARD</button>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.view-board', goToBoard);
      $('#boards').on('click', '.delete-board', deleteBoard);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
