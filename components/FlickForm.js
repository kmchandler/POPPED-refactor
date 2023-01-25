/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { updateFlick, createFlick } from '../api/flicksData';
import { getGenres, getSingleGenre } from '../api/genresData';
import { getMoods, getSingleMood } from '../api/moodsData';
import { createFlickGenre, updateFlickGenre } from '../api/flickGenreData';
import { createFlickMoods, updateFlickMood } from '../api/flickMoodsData';

const initialState = {
  title: '',
  type: '',
  cast_crew: '',
  recommended_by: '',
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
    if (obj.id) {
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
    if (obj.id) {
      updateFlick(formInput).then((flick) => {
        const genrePromise = updateFlickGenre(flick, checkedGenre);
        const moodsPromise = updateFlickMood(flick, checkedMood);

        Promise.all([moodsPromise, genrePromise]).then(() => router.push('/flicks/watchlist'));
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createFlick(payload).then((flick) => {
        const genrePromises = checkedGenre.map((genre) => (
          getSingleGenre(genre.id).then((genreObj) => {
            const flickGenreObj = { flick_id: flick.id, genre_id: genreObj.genre_id };
            return createFlickGenre(flickGenreObj);
          })
        ));

        const moodPromises = checkedMood.map((mood) => (
          getSingleMood(mood.id).then((moodObj) => {
            const flickMoodObj = { flick_id: flick.id, mood_id: moodObj.mood_id };
            return createFlickMoods(flickMoodObj);
          })
        ));

        Promise.all([...genrePromises, ...moodPromises])
          .then(() => router.push('/flicks/watchlist'));
      });
    }
  };

  const handleClickGenre = (e) => {
    let updatedGenre = [...checkedGenre];
    const newGenreObj = genres.find((genre) => genre.genre_name === e.target.name);

    if (e.target.checked) {
      updatedGenre = [...checkedGenre, newGenreObj];
    } else {
      updatedGenre.splice(checkedGenre.findIndex((cg) => cg.genre_name === newGenreObj.genre_name), 1);
    }
    setCheckedGenre(updatedGenre);
  };

  const handleClickMood = (e) => {
    let updatedMood = [...checkedMood];
    const newMoodObj = moods.find((mood) => mood.mood_name === e.target.name);

    if (e.target.checked) {
      updatedMood = [...checkedMood, newMoodObj];
    } else {
      updatedMood.splice(checkedMood.findIndex((cm) => cm.mood_name === newMoodObj.mood_name), 1);
    }
    setCheckedMood(updatedMood);
  };

  return (
    <div className="flickFormContainer">
      <Form className="flickForm" onSubmit={handleSubmit}>
        <h2 className="flickHeaderText mt-5">{obj.id ? 'update' : 'add'} flick</h2>
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
            <div key={genre.id} className="mb-3">
              <Form.Check
                type="checkbox"
                id={genre.id}
                label={genre.genre_name}
                defaultChecked={checkedGenre.find((cg) => cg?.genre_name === genre.genre_name)}
                onChange={handleClickGenre}
                name={genre.genre_name}
              />
            </div>
          ))}
        </div>

        <h5>moods</h5>
        <div className="moodDivFlick">
          {moods.map((mood) => (
            <div key={mood.id} className="mb-3">
              <Form.Check
                type="checkbox"
                id={mood.id}
                label={mood.mood_name}
                defaultChecked={checkedMood.find((cm) => cm?.mood_name === mood.mood_name)}
                onChange={handleClickMood}
                name={mood.mood_name}
              />
            </div>
          ))}
        </div>

        <FloatingLabel controlId="floatingInput5" label="cast and crew" className="mb-3">
          <Form.Control type="text" placeholder="cast and crew" name="cast_crew" value={formInput.cast_crew} onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput6" label="recommended by" className="mb-3">
          <Form.Control type="text" placeholder="recommended by" name="recommended_by" value={formInput.recommended_by} onChange={handleChange} />
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
          <Form.Control type="url" placeholder="photo url" name="image_url" value={formInput.image_url} onChange={handleChange} required />
        </FloatingLabel>

        <button className="flickFormButton" type="submit">{obj.id ? 'update' : 'add'} flick</button>
      </Form>
    </div>
  );
}

FlickForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    moods: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    cast_crew: PropTypes.string,
    recommended_by: PropTypes.string,
    watched: PropTypes.bool,
    favorite: PropTypes.bool,
    image_url: PropTypes.string,
    rating: PropTypes.string,
    uid: PropTypes.string,
  }),
};

FlickForm.defaultProps = {
  obj: initialState,
};

export default FlickForm;
