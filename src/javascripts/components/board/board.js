import $ from 'jquery';
// import firebase from 'firebase';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardsData';
// import boards from '../boards/boards';
import pin from '../pins/pin';
import utilities from '../../helpers/utilities';
import './board.scss';

const boardsDiv = $('#boards');
const boardDiv = $('#board');

const deleteFromBoard = (e) => {
  e.preventDefault();
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
  let domString = `<h1 class="text-center">${boardData.name}</h1>`;
  domString += '<center><a href="/"class="btn btn-link go-back-boards">GO BACK TO BOARDS</a></center>';
  domString += `<div id="${boardId}" class="d-flex flex-wrap justify-content-center board-display">`;
  pinData.getPins(boardId)
    .then((pins) => {
      pins.forEach((p) => {
        domString += pin.pinCard(p);
      });
      domString += '</div>';
      utilities.printToDom('board', domString);
      $('#board').on('click', '.delete-pin', deleteFromBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
