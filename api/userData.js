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

const createUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username,
    image_url: user.imageUrl,
    uid: user.uid,
  };
  fetch(`${dbUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getUserByUserId = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flicks/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        type: data.type,
        watched: data.watched,
        favorite: data.favorite,
        image_url: data.imageUrl,
        rating: data.rating,
        uid: data.uid,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username,
    image_url: user.imageUrl,
    uid: user.uid,
  };
  fetch(`${dbUrl}/users/${user.id}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getUserByUid,
  createUser,
  deleteSingleUser,
  updateUser,
  getUserByUserId,
};
