import { getFlicksByUid, getSingleFlick } from './flicksData';
import { getUserByUid, getUserByUserId } from './userData';
import { getAllGenresByUserId } from './userGenreData';
import { getSingleGenre } from './genresData';
import { getAllGenresByFlickId } from './flickGenreData';
import { getAllMoodsByFlickId } from './flickMoodsData';
import { getSingleMood } from './moodsData';

const getGenresForUser = async (id) => {
  const userGenres = await getAllGenresByUserId(id);
  const promises = userGenres.map((userGenre) => getSingleGenre(userGenre.genre_id));
  return Promise.all(promises);
};

const getSingleUserWithMetaData = async (id) => {
  const user = await getUserByUserId(id);
  const genres = await getGenresForUser(id);
  return {
    ...user,
    genres,
  };
};

const getUserByUidWithMetaData = async (uid) => {
  const user = await getUserByUid(uid);
  const genres = await getGenresForUser(user.id);
  return {
    ...user,
    genres,
  };
};

const getGenresForFlick = async (id) => {
  const flickGenres = await getAllGenresByFlickId(id);
  const promises = flickGenres.map((flickGenre) => getSingleGenre(flickGenre.genreId));
  return Promise.all(promises);
};

const getMoodsForFlick = async (id) => {
  const flickMoods = await getAllMoodsByFlickId(id);
  const promises = flickMoods.map((flickMood) => getSingleMood(flickMood.moodId));
  return Promise.all(promises);
};

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

const getSingleFlickWithMetaData = async (flickId) => {
  const flick = await getSingleFlick(flickId);
  const genres = await getGenresForFlick(flickId);
  const moods = await getMoodsForFlick(flickId);
  return {
    ...flick,
    genres,
    moods,
  };
};

export {
  getFlicksByUidWithMetaData, getSingleFlickWithMetaData, getUserByUidWithMetaData, getSingleUserWithMetaData, getGenresForUser, getGenresForFlick, getMoodsForFlick,
};
