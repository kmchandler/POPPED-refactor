/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';
import FlickCard from '../../components/FlickCard';
import { getFlicksByUidWithMetaData } from '../../api/mergedData';
import { getGenres } from '../../api/genresData';

export default function Watchlist() {
  const [formInput, setFormInput] = useState([]);
  const [flicks, setFlicks] = useState([]);
  const [filteredFlicks, setFilteredFlicks] = useState([]);
  const [genres, setGenres] = useState([]);
  const { user } = useAuth();

  const getAllTheFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
    setFilteredFlicks(flicksWithMetaData);
  };

  useEffect(() => {
    getGenres().then(setGenres);
    getAllTheFlicks();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value === 'none') {
      setFilteredFlicks(flicks);
    } else {
      const filteredResults = flicks.filter((flick) => flick.genres.some((genre) => genre.genreName === value));
      setFilteredFlicks(filteredResults);
    }
  };

  return (
    <>
      <Head>
        <title>POPPED:watchlist</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>;
      <div className="text-center my-4 flickCardsDiv">
        <h1 className="watchlistHeader">watchlist</h1>
        <div className="flickHeaderDiv">
          <div className="watchlistSearchbar">
            <Search flicks={flicks} setFilteredFlicks={setFilteredFlicks} />
          </div>
        </div>
        <form className="filterGenre" onSubmit={(e) => e.preventDefault()}>
          <Form.Select
            aria-label="Filter by Genre"
            name="genre"
            onChange={handleChange}
            className="mb-3"
            value={formInput.genre}
          >
            <option value="">filter by genre</option>
            <option value="none">all genres</option>
            {
            genres.map((genre) => (
              <option
                key={genre.genreFirebaseKey}
                value={genre.genreName}
                id={genre.genreName}
              >
                {genre.genreName}
              </option>
            ))
          }
          </Form.Select>
        </form>
        <Link href="/flicks/new" passHref>
          <button type="button" className="flickButton">add a flick</button>
        </Link>
        <div className="d-flex flex-wrap cardContainer watchlistCardDiv">
          {filteredFlicks.map((flix) => <FlickCard key={flix.flicksFirebaseKey} flickObj={flix} onUpdate={getAllTheFlicks} />)}
        </div>
      </div>
    </>
  );
}
