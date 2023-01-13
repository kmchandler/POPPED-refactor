// import axios from 'axios';
// import { clientCredentials } from '../utils/client';
// import { getFlicksByUid, getSingleFlick } from './flicksData';
// import { getUserByUid } from './userData';

// const dbUrl = clientCredentials.databaseURL;

// const createUserGenre = (newUserGenreObj) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/user_genres.json`, newUserGenreObj)
//     .then((response) => {
//       const body = { firebaseKey: response.data.name };
//       axios.patch(`${dbUrl}/user_genres/${response.data.name}.json`, body)
//         .then(resolve)
//         .catch(reject);
//     });
// });

// const getUserGenresForUser = async (id) => {
//   const response = await fetch(`${dbUrl}/user_genres.json?orderBy="id"&equalTo="${id}"`);
//   return JSON.stringify(response.data) === '{}' ? [] : Object.values(response.data);
// };

// const getGenresForUser = async (id) => {
//   const userGenres = await getUserGenresForUser(id);
//   const promises = userGenres.map((userGenre) => getGenresByGenreFirebaseKey(userGenre.genreId));
//   return Promise.all(promises);
// };

// const getSingleUserWithMetaData = async (id) => {
//   const user = await getUserByUid(id);
//   const genres = await getGenresForUser(id);
//   return {
//     ...user,
//     genres,
//   };
// };

// const deleteUserGenre = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/user_genres/${firebaseKey}.json`)
//     .then(resolve)
//     .catch(reject);
// });

// const updateUserGenres = async (user, checkedGenres) => {
//   const genresForUser = await getGenresForUser(user.userFirebaseKey);
//   const genresToDelete = genresForUser.filter((genreForUser) => !checkedGenres.find((cg) => cg.genreName === genreForUser.genreName));
//   const genresToAdd = checkedGenres.filter((checkedGenre) => !genresForUser.find((genreForUser) => genreForUser.genreName === checkedGenre.genreName));

//   const deletePromises = genresToDelete.map(async (genreToDelete) => {
//     const userGenres = await getUserGenresForUser(user.userFirebaseKey);
//     const theGenresToDelete = userGenres.find((userGenre) => userGenre.genreFirebaseKey === genreToDelete.genreFirebaseKey);
//     return deleteUserGenre(theGenresToDelete.firebaseKey);
//   });

//   const addPromises = genresToAdd.map(async (genreToAdd) => {
//     const userGenre = { userFirebaseKey: user.userFirebaseKey, genreFirebaseKey: genreToAdd.genreFirebaseKey };
//     return createUserGenre(userGenre);
//   });

//   return Promise.all([...deletePromises, ...addPromises]);
// };

// const getUserByUidWithMetaData = async (uid) => {
//   const user = await getUserByUid(uid);
//   const genres = await getGenresForUser(user.userFirebaseKey);
//   return {
//     ...user,
//     genres,
//   };
// };

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

// const createFlickGenre = (flickGenreObj) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/flick_genres.json`, flickGenreObj)
//     .then((response) => {
//       const body = { firebaseKey: response.data.name };
//       axios.patch(`${dbUrl}/flick_genres/${response.data.name}.json`, body)
//         .then(resolve)
//         .catch(reject);
//     });
// });

// const deleteFlickGenre = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/flick_genres/${firebaseKey}.json`)
//     .then(resolve)
//     .catch(reject);
// });

// const getFlickMoods = () => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/flick_moods`)
//     .then((response) => {
//       if (response.data) {
//         resolve(Object.values(response.data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// const createFlickMood = (flickMoodsObj) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/flick_moods.json`, flickMoodsObj)
//     .then((response) => {
//       const body = { firebaseKey: response.data.name };
//       axios.patch(`${dbUrl}/flick_moods/${response.data.name}.json`, body)
//         .then(() => {
//           getFlickMoodsForFlick(flickMoodsObj.flicksFirebaseKey).then(resolve);
//         });
//     })
//     .catch(reject);
// });

// const deleteFlickMood = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${dbUrl}/flick_moods/${firebaseKey}.json`)
//     .then(resolve)
//     .catch(reject);
// });

// const updateFlickGenres = async (flick, checkedGenres) => {
//   const genresForFlick = await getGenresForFlick(flick.flicksFirebaseKey);
//   const genresToDelete = genresForFlick.filter((genreForFlick) => !checkedGenres.find((cg) => cg.genreName === genreForFlick.genreName));
//   const genresToAdd = checkedGenres.filter((checkedGenre) => !genresForFlick.find((genreForFlick) => genreForFlick.genreName === checkedGenre.genreName));

//   const deletePromises = genresToDelete.map(async (genreToDelete) => {
//     const flickGenres = await getFlickGenresForFlick(flick.flicksFirebaseKey);
//     const flickToDelete = flickGenres.find((flickGenre) => flickGenre.genreFirebaseKey === genreToDelete.genreFirebaseKey);
//     return deleteFlickGenre(flickToDelete.firebaseKey);
//   });

//   const addPromises = genresToAdd.map(async (genreToAdd) => {
//     const flickGenre = { id: flick.flicksFirebaseKey, genreFirebaseKey: genreToAdd.genreFirebaseKey };
//     return createFlickGenre(flickGenre);
//   });

//   return Promise.all([...deletePromises, ...addPromises]);
// };

// const updateFlickMoods = async (flick, checkedMoods) => {
//   const moodsForFlick = await getMoodsForFlick(flick.flicksFirebaseKey);
//   const moodsToDelete = moodsForFlick.filter((moodForFlick) => !checkedMoods.find((cm) => cm.moodsName === moodForFlick.moodsName));
//   const moodsToAdd = checkedMoods.filter((checkedMood) => !moodsForFlick.find((moodForFlick) => moodForFlick.moodsName === checkedMood.moodsName));

//   const deletePromises = moodsToDelete.map(async (moodToDelete) => {
//     const flickMoods = await getFlickMoodsForFlick(flick.flicksFirebaseKey);
//     const flickToDelete = flickMoods.find((flickMood) => flickMood.moodFirebaseKey === moodToDelete.moodFirebaseKey);
//     return deleteFlickMood(flickToDelete.firebaseKey);
//   });

//   const addPromises = moodsToAdd.map(async (moodToAdd) => {
//     const flickMood = { id: flick.flicksFirebaseKey, moodFirebaseKey: moodToAdd.moodFirebaseKey };
//     return createFlickMood(flickMood);
//   });

//   return Promise.all([...deletePromises, ...addPromises]);
// };

// const getFlicksByUidWithMetaData = async (uid) => {
//   const flicks = await getFlicksByUid(uid);
//   const promises = flicks.map(async (flick) => {
//     const genres = await getGenresForFlick(flick.flicksFirebaseKey);
//     const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
//     return {
//       ...flick,
//       genres,
//       moods,
//     };
//   });
//   return Promise.all(promises);
// };

// const getSingleFlickWithMetaData = async (flicksFirebaseKey) => {
//   const flick = await getSingleFlick(flicksFirebaseKey);
//   const genres = await getGenresForFlick(flick.flicksFirebaseKey);
//   const moods = await getMoodsForFlick(flick.flicksFirebaseKey);
//   return {
//     ...flick,
//     genres,
//     moods,
//   };
// };

// export {
//   updateFlickGenres, getFlickMoods, updateFlickMoods, getFlickGenresForFlick, getGenresForFlick, getFlicksByUidWithMetaData, getSingleFlickWithMetaData, createFlickGenre, createFlickMood, deleteFlickGenre, deleteFlickMood, createUserGenre, updateUserGenres, deleteUserGenre, getUserByUidWithMetaData, getGenresForUser, getSingleUserWithMetaData, getUserGenresForUser,
// };
