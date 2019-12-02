import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const updatePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

const switchBoard = (pinId, boardId) => axios.patch(`${baseUrl}/pins/${pinId}.json`, boardId);

export default {
  getPins,
  deletePin,
  addNewPin,
  updatePin,
  switchBoard,
};
