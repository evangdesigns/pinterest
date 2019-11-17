import './pin.scss';

const pinCard = (pins) => {
  let domString = '';
  domString += `
  <div class="card col-4">
    <div class="card-body">
    <h3 class="card-title text-center">${pins.name}</h3>
      <img src=${pins.imageUrl} class="card-img-top" alt="${pins.name}">
    </div>
    <div class="card-footer">
      <center id="${pins.boardId}">
        <a href="${pins.url}" class="btn btn-danger btn-block" target="_blank" id="${pins.id}">VIEW</a>
        <button class="btn btn-link move-pin" id="move-${pins.id}">Move Pin</button> | <button class="btn btn-link delete-pin" id="${pins.id}">Delete Pin</button>
      </center>
    </div>
  </div>`;
  return domString;
};

export default { pinCard };
