import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserFlicks = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_flicks`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createUserFlick = (userFlicks) => new Promise((resolve, reject) => {
  const UserFlicksObj = {
    flick_id: userFlicks.flickId,
    user_id: userFlicks.userId,
  };
  fetch(`${dbUrl}/user_flicks`, {
    method: 'POST',
    body: JSON.stringify(UserFlicksObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleUserFlick = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_flicks/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        user_id: data.userId,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleUserFlick = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_flicks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createUserFlick,
  getSingleUserFlick,
  deleteSingleUserFlick,
  getUserFlicks,
};
