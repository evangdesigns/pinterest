import './boards.scss';
import utilities from '../../helpers/utilities';

const printBoards = () => {
  const domString = `<div id="boards">
    <h1 class="text-center">BOARDS</h1>
  </div>`;

  utilities.printToDom('boards', domString);
};

export default { printBoards };
