import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGenres = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createGenre = (genre) => new Promise((resolve, reject) => {
  const genreObj = {
    genre_name: genre.genre_name,
  };
  fetch(`${dbUrl}/genres`, {
    method: 'POST',
    body: JSON.stringify(genreObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

const deleteSingleGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/genres/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createGenre,
  getSingleGenre,
  deleteSingleGenre,
  getGenres,
};
