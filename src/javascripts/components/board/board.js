import $ from 'jquery';
import pinData from '../../helpers/data/pinData';
// import utilities from '../../helpers/utilities';
import './board.scss';

const boardsDiv = $('#boards');
const boardDiv = $('#board');

const buildBoard = (boardId) => {
  boardsDiv.addClass('hide');
  boardDiv.removeClass('hide');
  pinData.getPinByBiD();
  console.log(pinData.getPinByBiD());
  console.log(boardId);
};

export default { buildBoard };
