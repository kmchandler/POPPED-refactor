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

const createFlickCastCrew = (flickCastCrew, flickId) => {
  const splitCastCrew = flickCastCrew.split(', ');
  return splitCastCrew.map((castCrew) => {
    const flickCastCrewObj = {
      flick_id: flickId,
      cast_crew: castCrew,
    };
    return fetch(`${dbUrl}/flick_cast_crews`, {
      method: 'POST',
      body: JSON.stringify(flickCastCrewObj),
      headers: {
        'content-type': 'application/json',
      },
    });
  });
};

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

const getAllFlickCastCrewsByFlickId = (flickId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_cast_crews?flick=${flickId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
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
  getAllFlickCastCrewsByFlickId,
};
