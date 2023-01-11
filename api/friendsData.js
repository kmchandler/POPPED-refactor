// import axios from 'axios';
// import { clientCredentials } from '../utils/client';

// const dbUrl = clientCredentials.databaseURL;

// const getFriendsByUid = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch((error) => reject(error));
// });

// const createFriend = (friendObj) => new Promise((resolve, reject) => {
//   axios.post(`${dbUrl}/friends.json?`, friendObj)
//     .then((response) => {
//       const payload = { friendsFirebaseKey: response.data.name };
//       axios.patch(`${dbUrl}/friends/${response.data.name}.json`, payload).then(() => {
//         getFriendsByUid(friendObj.uid).then((userArray) => resolve(userArray));
//       });
//     }).catch((error) => reject(error));
// });

// const getSingleFriend = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/friends/${firebaseKey}.json`)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });

// const deleteSingleFriend = (firebaseKey) => new Promise((resolve, reject) => {
//   axios.delete(`${dbUrl}/friends/${firebaseKey}.json`)
//     .then((response) => resolve(response.data))
//     .catch((error) => reject(error));
// });

// const updateFriend = (friendObj) => new Promise((resolve, reject) => {
//   axios.patch(`${dbUrl}/friends/${friendObj.name}.json`, friendObj)
//     .then(() => getFriendsByUid(friendObj.uid)).then(resolve)
//     .catch(reject);
// });

// export {
//   getFriendsByUid,
//   createFriend,
//   getSingleFriend,
//   deleteSingleFriend,
//   updateFriend,
// };
