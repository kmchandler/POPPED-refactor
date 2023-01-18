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
    flick_id: flickGenres.flickId,
    genre_id: flickGenres.genreId,
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

const getSingleFlickGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        genre_id: data.genreId,
      });
    })
    .catch((error) => reject(error));
});

// UPDATE THIS API CALL TO BE CORRECT
const getAllGenresByFlickId = (flickId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_genres/${flickId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        genre_id: data.genreId,
      });
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
  getAllGenresByFlickId,
};
