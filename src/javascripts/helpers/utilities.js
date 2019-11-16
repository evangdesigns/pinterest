import $ from 'jquery';
import 'bootstrap';

const printToDom = (divId, toPrint) => {
  $(`#${divId}`).html(toPrint);
};

const printModal = (title, body) => {
  const domString = `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="uniModalLabel">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ${body}
        </div>
      </div>
    </div>`;

  printToDom('uniModal', domString);
};

export default { printToDom, printModal };
