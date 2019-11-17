import $ from 'jquery';
import pin from '../pins/pin';
import pinData from '../../helpers/data/pinData';
import utilities from '../../helpers/utilities';
import './board.scss';

const boardsDiv = $('#boards');
const boardDiv = $('#board');

const addPin = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id;
  const newPin = {
    boardId,
    name: $('#pinName').val(),
    imageUrl: $('#pinImage').val(),
    url: $('#pinLink').val(),
  };
  pinData.addNewPin(newPin)
    .then(() => {
      $('#uniModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildBoard(boardId);
    })
    .catch((error) => console.error(error));
};

const pinModal = (boardId) => {
  const bId = boardId;
  const title = `Add A Pin to ${bId}`;
  const body = `<form>
    <div class="form-group">
      <label for="boardName">Board Name</label>
      <input type="text" class="form-control" id="pinName" placeholder="Enter Pin Name">
    </div>
    <div class="form-group">
      <label for="pinImage">Pin Image</label>
      <input type="text" class="form-control" id="pinImage" placeholder="Enter Pin Image address">
    </div>
    <div class="form-group">
      <label for="pinLink">Pin Link</label>
      <input type="text" class="form-control" id="pinLink" placeholder="Enter Pin Link">
    </div>
  </form>
  <button type="button" class="btn btn-danger add-new-pin" id="${bId}">ADD PIN</button>`;
  utilities.printModal(title, body);
  $(`#${bId}`).click(addPin);
};

const deleteFromBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.parentElement.id;
  const pinId = e.target.id;
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoard(boardId);
    })
    .catch((error) => console.error(error));
};

const buildBoard = (boardId) => {
  boardsDiv.addClass('hide');
  boardDiv.removeClass('hide');
  boardDiv.add(`#${boardId}`);
  let domString = `<h1 class="text-center">${boardId}</h1>`;
  domString += '<center><button type="link" class="btn btn-link add-pin" data-toggle="modal" data-target="#uniModal" id="add-pin">ADD PIN</button></center>';
  domString += `<center>
      <a href="/"class="btn btn-link go-back-boards">BACK TO BOARDS</a>
    </center>
    <div id="${boardId}" class="d-flex flex-wrap justify-content-center board-display">
  `;
  pinData.getPins(boardId)
    .then((pins) => {
      pins.forEach((p) => {
        domString += pin.pinCard(p);
      });
      domString += '</div>';
      utilities.printToDom('board', domString);
      $('#board').on('click', '.delete-pin', deleteFromBoard);
      $('#add-pin').click(pinModal(boardId));
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
