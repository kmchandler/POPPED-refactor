import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createUser, getUserByUid, updateUser } from '../api/userData';
import { getGenres } from '../api/genresData';
import { createUserGenre, updateUserGenres } from '../api/userGenreData';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  imageUrl: '',
};

function CreateUserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUserByUid(user.uid).then(setProfile);
    if (obj.id) {
      setFormInput(obj);
      setCheckedGenre(obj.genres || []);
    }
    getGenres().then(setGenres);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (obj.id) {
      updateUser(formInput).then((userObject) => {
        const genrePromise = updateUserGenres(userObject, checkedGenre);
        // need to update the updateUser function to work with the new backend

        Promise.all([genrePromise]).then(() => router.push(`/users/${obj.id}`));
      });
    } else {
      try {
        const payload = { ...formInput, uid: user.uid };

        const createdUser = await createUser(payload);
        const createdGenres = checkedGenre.map(async (genre) => createUserGenre({ userId: createdUser.id, genreId: genre.id }));
        Promise.all(createdGenres).then(() => router.push(`/users/${createdUser.id}`));
      } catch (exception) {
        console.warn(exception);
      }
    }
  };

  const handleClickGenre = (evt) => {
    let updatedGenre = [...checkedGenre];
    const newGenreObj = genres.find((genre) => genre.genre_name === evt.target.name);

    if (evt.target.checked) {
      updatedGenre = [...checkedGenre, newGenreObj];
    } else {
      updatedGenre.splice(checkedGenre.findIndex((cg) => cg.genreName === newGenreObj.genreName), 1);
    }
    setCheckedGenre(updatedGenre);
  };

  return (
    <div className="profilePage profilePageForm">
      <form onSubmit={handleSubmit}>
        <h2 className="updateProfileHeader">profile</h2>
        <input required type="text" name="firstName" value={formInput.firstName} className="form-control" placeholder="first name" onChange={handleChange} />
        <br />
        <input required type="text" name="lastName" value={formInput.lastName} className="form-control" placeholder="last name" onChange={handleChange} />
        <br />
        <input required type="text" name="username" value={formInput.username} className="form-control" placeholder="username" onChange={handleChange} />
        <br />
        <input type="url" name="imageUrl" value={formInput.imageUrl} className="form-control" placeholder="image url" onChange={handleChange} />
        <h5 className="favGenresHeader">favorite genres</h5>
        <div className="favGenresList">
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
        <div className="submitProfileButtonDiv">
          <button type="submit" className="submitProfileBtn" onSubmit={handleSubmit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

CreateUserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
  }),
};

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;
