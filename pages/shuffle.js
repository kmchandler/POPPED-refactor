/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getGenres } from '../api/genresData';
import { getMoods } from '../api/moodsData';
import { getFlicksByUidWithMetaData } from '../api/mergedData';

export default function Shuffle() {
  const [formInput, setFormInput] = useState([]);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [checkedMood, setCheckedMood] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
  };

  const getMoodsGenres = () => {
    getGenres().then(setGenres);
    getMoods().then(setMoods);
  };

  useEffect(() => {
    getFlicks();
    getMoodsGenres();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickGenre = (e) => {
    let updatedGenre = [...checkedGenre];
    if (e.target.checked) {
      updatedGenre = [...checkedGenre, e.target.name];
    } else {
      updatedGenre.splice(checkedGenre.indexOf(e.target.name), 1);
    }
    setCheckedGenre(updatedGenre);
  };

  const handleClickMood = (e) => {
    let updatedMood = [...checkedMood];
    if (e.target.checked) {
      updatedMood = [...checkedMood, e.target.name];
    } else {
      updatedMood.splice(checkedMood.indexOf(e.target.name), 1);
    }
    setCheckedMood(updatedMood);
  };

  const handleSubmit = () => {
    const flickData = flicks.reduce((acc, flick) => {
      if (checkedGenre.length > 0) {
        const genreFound = flick.genres.some((genre) => checkedGenre.some((checkedGenreObj) => checkedGenreObj === genre.genre_name));
        if (!genreFound) return acc;
      }
      if (checkedMood > 0) {
        const moodFound = flick.moods.some((mood) => checkedMood.some((checkedMoodObj) => checkedMoodObj === mood.genre_name));
        if (!moodFound) return acc;
      }
      if (formInput.watched) {
        const watchedFlick = (flick.watched === true && formInput.watched === 'true') || (flick.watched === false && formInput.watched === 'false');
        if (!watchedFlick) return acc;
      }
      if (formInput.type) {
        const flickType = flick.type === formInput.type;
        if (!flickType) return acc;
      }
      if (formInput.recommendedBy) {
        const recommendation = flick.recommended_by.includes(formInput.recommended_by);
        if (!recommendation) return acc;
      }
      acc.push(flick);
      return acc;
    }, []);

    if (flickData.length >= 1) {
      const result = flickData[Math.floor(Math.random() * flickData.length)];
      router.push(`/flicks/watchThis/${result.id}`);
    } else if (flickData.length <= 0) {
      router.push('/flicks/tryAgain');
    }
  };

  return (
    <form className="shuffleFormDiv" onSubmit={(e) => e.preventDefault()}>
      <Head>
        <title>POPPED:shuffle</title>
        <meta name="shuffle" content="Shuffle" />
      </Head>;
      <h1 className="iFeelLike">i feel like watching...</h1>
      <div>
        <div className="typeSelect">
          <Form.Select
            aria-label="Type"
            name="type"
            type="select"
            onChange={handleChange}
            className="mb-3"
            value={formInput.type}
          >
            <option value="">select type</option>
            <option value="Movie">movie</option>
            <option value="TV Show">tv show</option>
          </Form.Select>
        </div>
      </div>
      <div className="statusSelect">
        <Form.Select
          aria-label="Watched"
          name="watched"
          type="select"
          onChange={handleChange}
          className="mb-3"
          value={formInput.watched}
        >
          <option value="">something old or something new?</option>
          <option value="true">watched</option>
          <option value="false">haven&apos;t watched</option>
        </Form.Select>
      </div>
      <h5 className="shuffleGenre">genre</h5>
      <div className="genreDiv">
        {genres.map((genre) => (
          <div key={genre.id} className="mb-3">
            <Form.Check
              type="checkbox"
              id={genre.id}
              label={genre.genre_name}
              checked={checkedGenre.indexOf(genre.genre_name) >= 0}
              onChange={handleClickGenre}
              name={genre.genre_name}
            />
          </div>
        ))}
      </div>
      <h5 className="shuffleMood">mood</h5>
      <div className="moodDiv">
        {moods.map((mood) => (
          <div key={mood.id} className="mb-3">
            <Form.Check
              type="checkbox"
              id={mood.id}
              label={mood.mood_name}
              checked={checkedMood.indexOf(mood.mood_name) >= 0}
              onChange={handleClickMood}
              name={mood.mood_name}
            />
          </div>
        ))}
      </div>
      <div>
        <div>
          <input type="text" name="recommendedBy" value={formInput.recommended_by} className="form-control recommendedByField" placeholder="recommended by" onChange={handleChange} />
        </div>
      </div>
      <button className="submitShuffleFormBtn" type="button" onClick={handleSubmit}>shuffle</button>
    </form>
  );
}
