import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMoodsByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getMoods = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createMood = (moodObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods.json?`, moodObj)
    .then((response) => {
      const payload = { moodFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/moods/${response.data.name}.json`, payload).then(() => {
        getMoodsByUid(moodObj.uid).then((userArray) => resolve(userArray));
      });
    }).catch((error) => reject(error));
});

const getSingleMood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleMoodByName = (moodsName) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods.json?orderBy="moodsName"&equalTo="${moodsName}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data)[0]);
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

const deleteSingleMood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getMoodsByMoodFirebaseKey = (moodFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/moods.json?orderBy="moodFirebaseKey"&equalTo="${moodFirebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data)[0]);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export {
  getMoodsByUid,
  createMood,
  getSingleMood,
  deleteSingleMood,
  getSingleMoodByName,
  getMoods,
  getMoodsByMoodFirebaseKey,
};
