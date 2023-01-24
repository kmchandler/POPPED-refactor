/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import FavoritedFlicksCard from './FavoritedFlicksCard';

export default function ProfileCard({ userObj, flicksList }) {
  let profileImage = '';
  if (userObj.image_url !== '') {
    profileImage = userObj.image_url;
  } else {
    profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }

  const favoritedFlicks = [];
  flicksList.forEach((flick) => {
    if (flick.favorite) favoritedFlicks.push(flick);
  });
  return (
    <div className="profileCardDiv">
      <img src={profileImage} alt={userObj.username} className="rounded-circle profilePagePic" />
      <br />
      <h1>{userObj.first_name} {userObj.last_name}</h1>
      <h2>{userObj.username}</h2>
      <br />
      <Link href="/flicks/watchlist" passHref>
        <button type="button" className="watchlistButton">view watchlist</button>
      </Link>
      <br />
      {userObj.genres?.length > 0 ? <h3>favorite genres:</h3> : null}
      {userObj.genres?.map((genre) => <h6 className="favGenres">- {genre.genre_name}</h6>)}
      <br />
      {favoritedFlicks.length > 0 ? <h3>favorited flicks:</h3> : null}
      <div className="d-flex flex-wrap cardContainer favoritedFlicksDiv">
        {favoritedFlicks.map((flick) => <FavoritedFlicksCard key={flick.flicksFirebaseKey} flickObj={flick} />)}
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    image_url: PropTypes.string,
    uid: PropTypes.string,
  }),
  flicksList: PropTypes.arrayOf(PropTypes.shape({
    favorite: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
};

ProfileCard.defaultProps = {
  userObj: {},
};
