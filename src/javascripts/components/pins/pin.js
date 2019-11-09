import './pin.scss';

const pinCard = (pins) => {
  let domString = '';
  domString += `
  <div class="card col-4">
    <div class="card-body">
    <h3 class="card-title text-center">${pins.name}</h3>
    <a href="${pins.url}" target="_blank">
      <img src=${pins.imageUrl} class="card-img-top" alt="${pins.name}">
    </div>
    <div class="card-footer">
      <center>
        <button type="submit" class="btn btn-danger btn-block" formaction="" id="${pins.id}">VIEW</button>
      </center>
      </a>
    </div>
  </div>`;
  return domString;
};

export default { pinCard };
