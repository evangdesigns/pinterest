import './boards.scss';
import utilities from '../../helpers/utilities';
import boards from '../../helpers/data/boardsData';

const printBoards = () => {
  boards.getBoards()
    .then((boardId) => {
      let domString = `<div id="boards">
      <h1 class="text-center">BOARDS</h1>
      </div>`;
      domString += '<div id="snack-section" class="d-flex flex-wrap justify-content-center">';
      boardId.forEach((board) => {
        console.log(board);
      });
      utilities.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { printBoards };
