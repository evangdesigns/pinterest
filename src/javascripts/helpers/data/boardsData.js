import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const boardsById = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const addNewBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const updateBoard = (boardId, updatedBoard) => axios.put(`${baseUrl}/boards/${boardId}.json`, updatedBoard);

const editBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`)
    .then((result) => {
      const board = result.data;
      resolve(board);
    })
    .catch((error) => reject(error));
});

export default {
  getBoards,
  boardsById,
  addNewBoard,
  deleteBoard,
  editBoard,
  updateBoard,
};
