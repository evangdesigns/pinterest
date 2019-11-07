import './boards.scss';
import utilities from '../../helpers/utilities';
import boards from '../../helpers/data/boardsData';

const printBoards = () => {
  boards.getBoards()
    .then((boardId) => {
      let domString = '<h1 class="text-center">BOARDS</h1>';
      domString += '<div id="boards-section" class="d-flex flex-wrap justify-content-center">';
      boardId.forEach((board) => {
        domString += `<div class="card col-4">
        <h3 class="text-center">${board.name}</h3>
        <button type="button" class="btn btn-danger" id="view-${board.id}">VIEW BOARD</button>
        </div>`;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
