import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getFlicksByUid, getSingleFlick } from './flicksData';
import { getUserByUid } from './userData';

const dbUrl = clientCredentials.databaseURL;

const createUserGenre = (newUserGenreObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_genres.json`, newUserGenreObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/user_genres/${response.data.name}.json`, body)
        .then(resolve)
        .catch(reject);
    });
});

// const getUserGenresForUser = async (id) => {
//   const response = await fetch(`${dbUrl}/user_genres.json?orderBy="id"&equalTo="${id}"`);
//   return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
// };

// const getGenresForUser = async (id) => {
//   const userGenres = await getUserGenresForUser(id);
//   const promises = userGenres.map((userGenre) => getGenresByGenreFirebaseKey(userGenre.genreId));
//   return Promise.all(promises);
// };

const getSingleUserWithMetaData = async (id) => {
  const user = await getUserByUid(id);
  const genres = await getGenresForUser(id);
  return {
    ...user,
    genres,
  };
};

const getUserByUidWithMetaData = async (uid) => {
  const user = await getUserByUid(uid);
  const genres = await getGenresForUser(user.userFirebaseKey);
  return {
    ...user,
    genres,
  };
};

// const getFlickGenresForFlick = async (id) => {
//   const response = await fetch(`${dbUrl}/flick_genres.json?orderBy="id"&equalTo="${id}"`);
//   return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
// };

// const getGenresForFlick = async (id) => {
//   const flickGenres = await getFlickGenresForFlick(id);
//   const promises = flickGenres.map((flickGenre) => getGenresByGenreFirebaseKey(flickGenre.genreFirebaseKey));
//   return Promise.all(promises);
// };

// const getFlickMoodsForFlick = async (id) => {
//   const response = await fetch(`${dbUrl}/flick_moods.json?orderBy="id"&equalTo="${id}"`);
//   return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
// };

// const getMoodsForFlick = async (id) => {
//   const flickMoods = await getFlickMoodsForFlick(id);
//   const promises = flickMoods.map((flickMood) => getMoodsByMoodFirebaseKey(flickMood.moodFirebaseKey));
//   return Promise.all(promises);
// };

const getFlicksByUidWithMetaData = async (uid) => {
  const flicks = await getFlicksByUid(uid);
  const promises = flicks.map(async (flick) => {
    const genres = await getGenresForFlick(flick.flicksFirebaseKey);
    const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
    return {
      ...flick,
      genres,
      moods,
    };
  });
  return Promise.all(promises);
};

const getSingleFlickWithMetaData = async (flicksFirebaseKey) => {
  const flick = await getSingleFlick(flicksFirebaseKey);
  const genres = await getGenresForFlick(flick.flicksFirebaseKey);
  const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
  return {
    ...flick,
    genres,
    moods,
  };
};

export {
  getFlicksByUidWithMetaData, getSingleFlickWithMetaData, createUserGenre, getUserByUidWithMetaData, getSingleUserWithMetaData,
};
