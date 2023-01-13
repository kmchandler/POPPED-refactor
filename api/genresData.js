import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGenresByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getGenres = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createGenre = (genreObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres.json?`, genreObj)
    .then((response) => {
      const payload = { genreFirebaseKey: response.data.genreFirebaseKey };
      axios.patch(`${dbUrl}/genres/${response.data.name}.json`, payload).then(() => {
        getGenresByUid(genreObj.uid).then((genreArray) => resolve(genreArray));
      });
    }).catch((error) => reject(error));
});

const getSingleGenre = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleGenreByName = (genreName) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres.json?orderBy="genreName"&equalTo="${genreName}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data)[0]);
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

const deleteSingleGenre = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getGenresByGenreFirebaseKey = (genreFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres.json?orderBy="genreFirebaseKey"&equalTo="${genreFirebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data)[0]);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export {
  getGenresByUid,
  createGenre,
  getSingleGenre,
  deleteSingleGenre,
  getGenres,
  getSingleGenreByName,
  getGenresByGenreFirebaseKey,
};
