import $ from 'jquery';
import utilities from '../../helpers/utilities';
import boards from '../../helpers/data/boardsData';
import iBoard from '../board/board';
import './boards.scss';

const goToBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('view-')[1];
  iBoard.buildBoard(boardId);
};

const printBoards = () => {
  boards.getBoards()
    .then((boardId) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<div id="boards-section" class="d-flex flex-wrap justify-content-center">';
      boardId.forEach((board) => {
        domString += `<div class="card col-4">
        <h3 class="text-center">${board.name}</h3>
        <button type="button" class="btn btn-danger view-board" id="view-${board.id}">VIEW BOARD</button>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.view-board', goToBoard);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
