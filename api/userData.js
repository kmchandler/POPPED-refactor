import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/checkuser', {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

// const createUser = (userObj) => new Promise((resolve, reject) => {
//   axios.post(`${dbUrl}/users.json?`, userObj)
//     .then((response) => {
//       const payload = { userFirebaseKey: response.data.name };
//       axios.patch(`${dbUrl}/users/${response.data.name}.json`, payload).then(() => {
//         getUserByUid(userObj.uid).then((user) => resolve(user));
//       });
//     }).catch((error) => reject(error));
// });

const getSingleUser = (id) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${id}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// const deleteSingleUser = (userFirebaseKey) => new Promise((resolve, reject) => {
//   axios.delete(`${dbUrl}/users/${userFirebaseKey}.json`)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });

// const updateUser = (userObj) => new Promise((resolve, reject) => {
//   axios.patch(`${dbUrl}/users/${userObj.userFirebaseKey}.json`, userObj)
//     .then(() => getUserByUid(userObj.uid)).then(resolve)
//     .catch(reject);
// });

export {
  getUserByUid,
  // createUser,
  getSingleUser,
  // deleteSingleUser,
  // updateUser,
};
