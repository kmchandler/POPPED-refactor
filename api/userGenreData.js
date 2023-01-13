import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserGenres = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_genres`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createUserGenre = (userGenres) => new Promise((resolve, reject) => {
  const userGenreObj = {
    user_id: userGenres.userId,
    genre_id: userGenres.genreId,
  };
  fetch(`${dbUrl}/user_genres`, {
    method: 'POST',
    body: JSON.stringify(userGenreObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleUserGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_genres/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user_id: data.userId,
        genre_id: data.genreId,
      });
    })
    .catch((error) => reject(error));
});

// UPDATE THIS API CALL TO BE CORRECT- currently pulling somerhing that cannot work with the router
const getAllGenresByUserId = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_genres/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user_id: data.userId,
        genre_id: data.genreId,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleUserGenre = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_genres/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createUserGenre,
  getSingleUserGenre,
  deleteSingleUserGenre,
  getUserGenres,
  getAllGenresByUserId,
};
