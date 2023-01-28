import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickMoods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_moods`)
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
    flick_id: flickMoods.flick_id,
    mood_id: flickMoods.mood_id,
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

const updateFlickMood = (flickMood) => new Promise((resolve, reject) => {
  const obj = {
    id: flickMood.id,
    flick_id: flickMood.flick_id,
    mood_id: flickMood.mood_id,
  };
  fetch(`${dbUrl}/flick_moods/${flickMood.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getAllFlickMoodsByFlickId = (flickId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_moods?flick=${flickId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
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
  deleteSingleFlickMoods,
  getFlickMoods,
  getAllFlickMoodsByFlickId,
  updateFlickMood,
};
