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
        const genreFound = flick.genres.some((genre) => checkedGenre.some((checkedGenreObj) => checkedGenreObj === genre.genreName));
        if (!genreFound) return acc;
      }
      if (checkedMood > 0) {
        const moodFound = flick.moods.some((mood) => checkedMood.some((checkedMoodObj) => checkedMoodObj === mood.genreName));
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
        const recommendation = flick.recommendedBy.includes(formInput.recommendedBy);
        if (!recommendation) return acc;
      }
      acc.push(flick);
      return acc;
    }, []);

    if (flickData.length >= 1) {
      const result = flickData[Math.floor(Math.random() * flickData.length)];
      router.push(`/flicks/watchThis/${result.flicksFirebaseKey}`);
    } else if (flickData.length <= 0) {
      router.push('/flicks/tryAgain');
    }
  };

  return (
    <form className="shuffleFormDiv" onSubmit={(e) => e.preventDefault()}>
      <Head>
        <title>POPPED:shuffle</title>
        <meta name="description" content="Meta description for the team page" />
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
          <div key={genre.genreFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={genre.genreFirebaseKey}
              label={genre.genreName}
              checked={checkedGenre.indexOf(genre.genreName) >= 0}
              onChange={handleClickGenre}
              name={genre.genreName}
            />
          </div>
        ))}
      </div>
      <h5 className="shuffleMood">mood</h5>
      <div className="moodDiv">
        {moods.map((mood) => (
          <div key={mood.moodFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={mood.moodFirebaseKey}
              label={mood.moodsName}
              checked={checkedMood.indexOf(mood.moodsName) >= 0}
              onChange={handleClickMood}
              name={mood.moodsName}
            />
          </div>
        ))}
      </div>
      <div>
        <div>
          <input type="text" name="recommendedBy" value={formInput.recommendedBy} className="form-control recommendedByField" placeholder="recommended by" onChange={handleChange} />
        </div>
      </div>
      <button className="submitShuffleFormBtn" type="button" onClick={handleSubmit}>shuffle</button>
    </form>
  );
}
