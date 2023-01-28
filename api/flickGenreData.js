import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickGenres = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlickGenre = (flickGenres) => new Promise((resolve, reject) => {
  const flickGenresObj = {
    flick_id: flickGenres.flick_id,
    genre_id: flickGenres.genre_id,
  };
  fetch(`${dbUrl}/flick_genres`, {
    method: 'POST',
    body: JSON.stringify(flickGenresObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateFlickGenre = (flickGenre) => new Promise((resolve, reject) => {
  const obj = {
    id: flickGenre.id,
    flick_id: flickGenre.flick_id,
    genre_id: flickGenre.genre_id,
  };
  fetch(`${dbUrl}/flick_genres/${flickGenre.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getSingleFlickGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flick_id,
        genre_id: data.genre_id,
      });
    })
    .catch((error) => reject(error));
});

const getAllFlickGenresByFlickId = (flickId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres?flick=${flickId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

const deleteSingleFlickGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createFlickGenre,
  getSingleFlickGenre,
  deleteSingleFlickGenre,
  getFlickGenres,
  getAllFlickGenresByFlickId,
  updateFlickGenre,
};
