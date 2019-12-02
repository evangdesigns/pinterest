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

const updateBoard = (e) => {
  const boardId = e.target.id.split('update-')[1];
  const { uid } = firebase.auth().currentUser;
  const updatedBoard = {
    name: $('#boardName').val(),
    uid,
  };
  boardData.updateBoard(boardId, updatedBoard)
    .then(() => {
      $('#uniModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      printBoards(uid);
    })
    .catch((error) => console.error(error));
};

const boardModal = (x, id) => {
  const title = `${x ? 'Update' : 'Add'} Board`;
  const body = `<form>
    <div class="form-group">
      <label for="boardName">Board Name</label>
      <input value="${x.name ? x.name : ''}" type="text" class="form-control" id="boardName" placeholder="Enter Board Name">
    </div>
    <button type="button" class="btn btn-danger btn-block save-board" id="${x ? 'update' : 'add'}-${id}">SAVE</button>
    </form>`;
  utilities.printModal(title, body);
  $('#uniModal').modal('show');
  $('#add-undefined').click('.save-board', addBoard);
  $(`#update-${id}`).click('.save-board', updateBoard);
};

const checkAction = (e) => {
  const id = e.target.id.split('update')[1];
  if (id) {
    boardData.editBoard(id)
      .then((x) => {
        boardModal(x, id);
      })
      .catch((error) => console.error(error));
  } else {
    boardModal(0);
  }
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
        <p class="text-center"><a href="#" class="update-board" id="update${board.id}">UPDATE BOARD</a> | <a href="#" class="delete-board" id="delete-${board.id}">DELETE BOARD</a></p>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.view-board', goToBoard);
      $('#boards').on('click', '.delete-board', deleteBoard);
      $('#boards').on('click', '.update-board', checkAction);
      $('#add-board').click(checkAction);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
