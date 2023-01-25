import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMoods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createMood = (mood) => new Promise((resolve, reject) => {
  const moodObj = {
    mood_name: mood.mood_name,
  };
  fetch(`${dbUrl}/moods`, {
    method: 'POST',
    body: JSON.stringify(moodObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleMood = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

const deleteSingleMood = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createMood,
  getSingleMood,
  deleteSingleMood,
  getMoods,
};
