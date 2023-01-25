import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickCastCrews = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_cast_crew.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlickCastCrew = (flickCastCrew) => new Promise((resolve, reject) => {
  const flickCastCrewObj = {
    flick_id: flickCastCrew.flickId,
    cast_crew: flickCastCrew.castCrew,
  };
  fetch(`${dbUrl}/flick_cast_crew`, {
    method: 'POST',
    body: JSON.stringify(flickCastCrewObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateFlickCastCrew = (flickCastCrew) => new Promise((resolve, reject) => {
  const obj = {
    id: flickCastCrew.id,
    flick_id: flickCastCrew.flick_id,
    cast_crew: flickCastCrew.genre_id,
  };
  fetch(`${dbUrl}/flick_cast_crew/${flickCastCrew.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getSingleFlickCastCrew = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_cast_crew/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        cast_crew: data.castCrew,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleFlickCastCrew = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_cast_crew/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createFlickCastCrew,
  getSingleFlickCastCrew,
  deleteSingleFlickCastCrew,
  getFlickCastCrews,
  updateFlickCastCrew,
};
