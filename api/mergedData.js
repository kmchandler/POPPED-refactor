import { getFlicksByUid, getSingleFlick } from './flicksData';
import { getUserByUid, getUserByUserId } from './userData';
import { getAllGenresByUserId } from './userGenreData';
import { getSingleGenre } from './genresData';
import { getAllFlickGenresByFlickId } from './flickGenreData';
import { getAllFlickMoodsByFlickId } from './flickMoodsData';
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

const getGenresForFlick = async (flickId) => {
  const flickGenres = await getAllFlickGenresByFlickId(flickId);
  const promises = flickGenres.map((flickGenre) => getSingleGenre(flickGenre.genre_id));
  return Promise.all(promises);
};

const getMoodsForFlick = async (id) => {
  const flickMoods = await getAllFlickMoodsByFlickId(id);
  const promises = flickMoods.map((flickMood) => getSingleMood(flickMood.mood_id));
  return Promise.all(promises);
};

const getFlicksByUidWithMetaData = async (uid) => {
  const flicks = await getFlicksByUid(uid);
  const promises = flicks.map(async (flick) => {
    const genres = await getGenresForFlick(flick.id);
    const moods = await getMoodsForFlick(flick.id);
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
