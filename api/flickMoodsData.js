import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickMoods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_moods.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlickMoods = (flickMoods) => new Promise((resolve, reject) => {
  const flickMoodsObj = {
    flick_id: flickMoods.flickId,
    mood_id: flickMoods.moodId,
  };
  fetch(`${dbUrl}/flick_moods`, {
    method: 'POST',
    body: JSON.stringify(flickMoodsObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleFlickMoods = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_moods/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        mood_id: data.moodId,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleFlickMoods = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_moods/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createFlickMoods,
  getSingleFlickMoods,
  deleteSingleFlickMoods,
  getFlickMoods,
};
