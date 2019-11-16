import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardsData';
import pinData from '../../helpers/data/pinData';
import iBoard from '../board/board';
import './boards.scss';

const addBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#boardName').val(),
    uid,
  };
  boardData.addNewBoard(newBoard)
    .then(() => {
      $('#uniModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printBoards(uid);
    })
    .catch((error) => console.error(error));
};

const boardModal = () => {
  const title = 'Add Board';
  const body = `<form>
    <div class="form-group">
      <label for="boardName">Board Name</label>
      <input type="text" class="form-control" id="boardName" placeholder="Enter Board Name">
    </div>
  </form>
  <button type="button" class="btn btn-danger add-new-board" id="add-board">ADD BOARD</button>`;
  utilities.printModal(title, body);
  $('#add-board').click(addBoard);
};

const goToBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('view-')[1];
  iBoard.buildBoard(boardId);
};

const deleteBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('delete-')[1];
  boardData.deleteBoard(boardId)
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
  boardData.getBoards(uid)
    .then((boardId) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<center><button type="link" class="btn btn-link add-board" data-toggle="modal" data-target="#uniModal" id="add-board">ADD BOARD</button></center>';
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
      $('#add-board').click(boardModal);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
