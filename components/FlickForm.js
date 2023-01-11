/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { updateFlick, createFlick } from '../api/flicksData';
import {
  createFlickGenre, createFlickMood, updateFlickGenres, updateFlickMoods,
} from '../api/mergedData';
import { getGenres, getSingleGenreByName } from '../api/genresData';
import { getMoods, getSingleMoodByName } from '../api/moodsData';

const initialState = {
  title: '',
  type: '',
  castCrew: '',
  recommendedBy: '',
  watched: false,
  favorite: false,
  imageUrl: '',
  rating: '',
};

function FlickForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [checkedMood, setCheckedMood] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);
    getMoods().then(setMoods);
    if (obj.flicksFirebaseKey) {
      setFormInput(obj);
      setCheckedGenre(obj.genres || []);
      setCheckedMood(obj.moods || []);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.flicksFirebaseKey) {
      updateFlick(formInput).then((flick) => {
        const genrePromise = updateFlickGenres(flick, checkedGenre);
        const moodsPromise = updateFlickMoods(flick, checkedMood);

        Promise.all([moodsPromise, genrePromise]).then(() => router.push('/flicks/watchlist'));
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createFlick(payload).then((flick) => {
        const genrePromises = checkedGenre.map((genre) => (
          getSingleGenreByName(genre.genreName).then((genreObj) => {
            const flickGenreObj = { flickFirebaseKey: flick.flicksFirebaseKey, genreFirebaseKey: genreObj.genreFirebaseKey };
            return createFlickGenre(flickGenreObj);
          })
        ));

        const moodPromises = checkedMood.map((mood) => (
          getSingleMoodByName(mood.moodsName).then((moodObj) => {
            const flickMoodObj = { flickFirebaseKey: flick.flicksFirebaseKey, moodFirebaseKey: moodObj.moodFirebaseKey };
            return createFlickMood(flickMoodObj);
          })
        ));

        Promise.all([...genrePromises, ...moodPromises])
          .then(() => router.push('/flicks/watchlist'));
      });
    }
  };

  const handleClickGenre = (e) => {
    let updatedGenre = [...checkedGenre];
    const newGenreObj = genres.find((genre) => genre.genreName === e.target.name);

    if (e.target.checked) {
      updatedGenre = [...checkedGenre, newGenreObj];
    } else {
      updatedGenre.splice(checkedGenre.findIndex((cg) => cg.genreName === newGenreObj.genreName), 1);
    }
    setCheckedGenre(updatedGenre);
  };

  const handleClickMood = (e) => {
    let updatedMood = [...checkedMood];
    const newMoodObj = moods.find((mood) => mood.moodsName === e.target.name);

    if (e.target.checked) {
      updatedMood = [...checkedMood, newMoodObj];
    } else {
      updatedMood.splice(checkedMood.findIndex((cm) => cm.moodsName === newMoodObj.moodsName), 1);
    }
    setCheckedMood(updatedMood);
  };

  return (
    <div className="flickFormContainer">
      <Form className="flickForm" onSubmit={handleSubmit}>
        <h2 className="flickHeaderText mt-5">{obj.flicksFirebaseKey ? 'update' : 'add'} flick</h2>
        <Form.Control type="text" placeholder="title" name="title" value={formInput.title} onChange={handleChange} required />
        <br />
        <Form.Select
          aria-label="Type"
          name="type"
          type="select"
          onChange={handleChange}
          className="mb-3 typeSelect"
          required
          value={formInput.type}
        >
          <option value="">select type</option>
          <option value="Movie">movie</option>
          <option value="TV Show">tv show</option>
        </Form.Select>

        <h5>genre</h5>
        <div className="genreDivFlick">
          {genres.map((genre) => (
            <div key={genre.genreFirebaseKey} className="mb-3">
              <Form.Check
                type="checkbox"
                id={genre.genreFirebaseKey}
                label={genre.genreName}
                defaultChecked={checkedGenre.find((cg) => cg?.genreName === genre.genreName)}
                onChange={handleClickGenre}
                name={genre.genreName}
              />
            </div>
          ))}
        </div>

        <h5>moods</h5>
        <div className="moodDivFlick">
          {moods.map((mood) => (
            <div key={mood.moodFirebaseKey} className="mb-3">
              <Form.Check
                type="checkbox"
                id={mood.moodFirebaseKey}
                label={mood.moodsName}
                defaultChecked={checkedMood.find((cm) => cm?.moodsName === mood.moodsName)}
                onChange={handleClickMood}
                name={mood.moodsName}
              />
            </div>
          ))}
        </div>

        <FloatingLabel controlId="floatingInput5" label="cast and crew" className="mb-3">
          <Form.Control type="text" placeholder="cast and crew" name="castCrew" value={formInput.castCrew} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput6" label="recommended by" className="mb-3">
          <Form.Control type="text" placeholder="recommended by" name="recommendedBy" value={formInput.recommendedBy} onChange={handleChange} />
        </FloatingLabel>

        <Form.Check
          type="switch"
          label="watched"
          name="watched"
          id="watched"
          checked={formInput.watched}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            watched: e.target.checked,
          }))}
        />

        <Form.Check
          type="switch"
          label="favorite"
          name="favorite"
          id="watched"
          checked={formInput.favorite}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }))}
        />

        <FloatingLabel controlId="floatingInput9" label="photo url" className="mb-3 photoUrlFlick">
          <Form.Control type="url" placeholder="photo url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <button className="flickFormButton" type="submit">{obj.flicksFirebaseKey ? 'update' : 'add'} flick</button>
      </Form>
    </div>
  );
}

FlickForm.propTypes = {
  obj: PropTypes.shape({
    flicksFirebaseKey: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    moods: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    castCrew: PropTypes.string,
    recommendedBy: PropTypes.string,
    watched: PropTypes.bool,
    favorite: PropTypes.bool,
    imageUrl: PropTypes.string,
    rating: PropTypes.string,
    uid: PropTypes.string,
  }),
};

FlickForm.defaultProps = {
  obj: initialState,
};

export default FlickForm;
