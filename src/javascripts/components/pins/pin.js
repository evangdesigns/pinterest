import './pin.scss';

const pinCard = (boardId) => {
  let domString = '';
  domString += `
  <div class="card col-4">
    <div class="card-body">
    <h3 class="card-title text-center">${boardId.name}</h3>
    <a href="${boardId.url}" target="_blank">
      <img src=${boardId.imageUrl} class="card-img-top" alt="${boardId.name}">
    </div>
    <div class="card-footer">
      <center>
      <button type="submit" class="btn btn-danger btn-block" formaction="" id="${boardId.id}">VIEW</button>
      </center>
      </a>
    </div>
  </div>`;
  return domString;
};

export default { pinCard };
