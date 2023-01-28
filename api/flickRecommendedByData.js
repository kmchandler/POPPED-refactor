import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlickRecommendedBy = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_bys`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlickRecommendedBy = (flickRecommendedBy, flickId) => {
  console.warn(flickRecommendedBy, 'frb');
  const splitRecommendedBy = flickRecommendedBy.split(', ');
  return splitRecommendedBy.map((recommendedBy) => {
    const flickRecommendedByObj = {
      flick_id: flickId,
      recommended_by: recommendedBy,
    };
    return fetch(`${dbUrl}/flick_recommended_bys`, {
      method: 'POST',
      body: JSON.stringify(flickRecommendedByObj),
      headers: {
        'content-type': 'application/json',
      },
    });
  });
};

const getSingleFlickRecommendedBy = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_bys/${id}`)
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

const getAllFlickRecommendedBysByFlickId = (flickId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_bys?flick=${flickId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => reject(error));
});

const deleteSingleFlickRecommendedBy = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/flick_recommended_bys/${id}`, {
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
  getAllFlickRecommendedBysByFlickId,
};
