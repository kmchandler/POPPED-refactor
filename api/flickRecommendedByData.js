import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickRecommendedBy = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_by`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlickRecommendedBy = (flickRecommendedBy) => new Promise((resolve, reject) => {
  const flickRecommendedByObj = {
    flick_id: flickRecommendedBy.flickId,
    recommended_by: flickRecommendedBy.recommendedBy,
  };
  fetch(`${dbUrl}/flick_recommended_by`, {
    method: 'POST',
    body: JSON.stringify(flickRecommendedByObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getSingleFlickRecommendedBy = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_by/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flick_id: data.flickId,
        recommended_by: data.recommendedBy,
      });
    })
    .catch((error) => reject(error));
});

const deleteSingleFlickRecommendedBy = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_by/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createFlickRecommendedBy,
  getSingleFlickRecommendedBy,
  deleteSingleFlickRecommendedBy,
  getFlickRecommendedBy,
};
