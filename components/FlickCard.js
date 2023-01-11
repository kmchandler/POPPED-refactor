import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { BsEyeglasses } from 'react-icons/bs';
import { deleteSingleFlick } from '../api/flicksData';
import StarRating from './StarRating';

function FlickCard({
  flickObj, onUpdate,
}) {
  const deleteThisFlick = () => {
    if (window.confirm(`Delete ${flickObj.title}?`)) {
      deleteSingleFlick(flickObj.flicksFirebaseKey).then(() => onUpdate());
    }
  };

  const glasses = <BsEyeglasses />;
  return (
    <>
      <Card className="flickCardDiv" style={{ width: '25rem', margin: '10px', height: '55rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.imageUrl} alt={flickObj.title} style={{ height: '550px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="recommendationTitle">{flickObj.title.toLowerCase()} {flickObj.favorite ? '⭐' : null} {flickObj.watched ? glasses : null}</Card.Title>
          <hr />
          <div className="cardDetails">
            <p className="flickCardType">type: {flickObj.type.toLowerCase()}</p>
            <p className="flickCardGenre">{flickObj.genres?.length > 0 ? 'genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre?.genreName) : ''}</p>
            <p className="flickCardMood">{flickObj.moods?.length > 0 ? 'moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood?.moodsName) : ''}</p>
            <p className="flickCardCastCrew">{flickObj.castCrew ? 'cast/crew: ' : ''}{flickObj.castCrew ? flickObj.castCrew.toLowerCase() : null}</p>
            <p className="flickCardRecommendedBy">{flickObj.recommendedBy ? 'recommended by: ' : ''}{flickObj.recommendedBy ? flickObj.recommendedBy.toLowerCase() : ''}</p>
            <div>{flickObj.watched ? <StarRating flickObj={flickObj} /> : null }</div>
          </div>
          <div className="flickCardBtns">
            <Link href={`/flicks/edit/${flickObj.flicksFirebaseKey}`} passHref>
              <button type="button" className="editButton">edit</button>
            </Link>
            <button type="button" className="deleteButton m-2" onClick={deleteThisFlick}>
              delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

FlickCard.propTypes = {
  flickObj: PropTypes.shape({
    flick: PropTypes.string,
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FlickCard;
