import $ from 'jquery';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardsData';
// import boards from '../boards/boards';
import pin from '../pins/pin';
import utilities from '../../helpers/utilities';
import './board.scss';

const boardsDiv = $('#boards');
const boardDiv = $('#board');

const buildBoard = (boardId) => {
  boardsDiv.addClass('hide');
  boardDiv.removeClass('hide');
  let domString = `<h1 class="text-center">${boardData.name}</h1>`;
  domString += '<center><a href="/"class="btn btn-link go-back-boards">GO BACK TO BOARDS</a></center>';
  domString += '<div id="board-section" class="d-flex flex-wrap justify-content-center">';
  pinData.getPins(boardId)
    .then((pins) => {
      pins.forEach((p) => {
        domString += pin.pinCard(p);
      });
      domString += '</div>';
      utilities.printToDom('board', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
