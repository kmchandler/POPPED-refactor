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
    flick_id: flickCastCrew.id,
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

const getSingleFlickCastCrew = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_cast_crew/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        flick_id: data.id,
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
};
