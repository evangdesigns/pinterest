import './home.scss';
import utilities from '../../helpers/utilities';

const printHome = () => {
  const domString = `<div id="home">
    <h1 class="text-center">PINT-E-REST</h1>
  </div>`;

  utilities.printToDom('home', domString);
};

export default { printHome };
