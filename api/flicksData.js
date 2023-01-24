import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlicksByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flicks?uid=${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleFlick = (id) => new Promise((resolve, reject) => {
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

const createFlick = (flick) => new Promise((resolve, reject) => {
  const flickObj = {
    title: flick.title,
    type: flick.type,
    watched: flick.watched,
    favorite: flick.favorite,
    image_url: flick.imageUrl,
    rating: flick.rating,
    uid: flick.uid,
  };
  fetch(`${dbUrl}/flicks`, {
    method: 'POST',
    body: JSON.stringify(flickObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteSingleFlick = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flicks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateFlick = (flick) => new Promise((resolve, reject) => {
  const flickObj = {
    id: flick.id,
    title: flick.title,
    type: flick.type,
    watched: flick.watched,
    favorite: flick.favorite,
    image_url: flick.imageUrl,
    rating: flick.rating,
    uid: flick.uid,
  };
  fetch(`${dbUrl}/flicks/${flick.id}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(flickObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getFlicksByUid,
  getSingleFlick,
  createFlick,
  deleteSingleFlick,
  updateFlick,
};
