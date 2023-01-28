import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { BsEyeglasses } from 'react-icons/bs';
import { deleteSingleFlick } from '../api/flicksData';
import StarRating from './StarRating';
import { getAllFlickCastCrewsByFlickId } from '../api/flickCastCrewData';
import { getAllFlickRecommendedBysByFlickId } from '../api/flickRecommendedByData';

function FlickCard({
  flickObj, onUpdate,
}) {
  const [castCrew, setCastCrew] = useState([]);
  const [recs, setRecs] = useState([]);
  console.warn(castCrew, 'cc');
  console.warn(recs, 'recs');

  const deleteThisFlick = () => {
    if (window.confirm(`Delete ${flickObj.title}?`)) {
      deleteSingleFlick(flickObj.id).then(() => onUpdate());
    }
  };
  const getInfo = async () => {
    const castCrewInfo = await getAllFlickCastCrewsByFlickId(flickObj.id);
    setCastCrew(castCrewInfo);
    const recommendedByInfo = await getAllFlickRecommendedBysByFlickId(flickObj.id);
    setRecs(recommendedByInfo);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const glasses = <BsEyeglasses />;
  return (
    <>
      <Card className="flickCardDiv" style={{ width: '25rem', margin: '10px', height: '55rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.image_url} alt={flickObj.title} style={{ height: '550px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="recommendationTitle">{flickObj.title.toLowerCase()} {flickObj.favorite ? '⭐' : null} {flickObj.watched ? glasses : null}</Card.Title>
          <hr />
          <div className="cardDetails">
            <p className="flickCardType">type: {flickObj.type.toLowerCase()}</p>
            <p className="flickCardGenre">{flickObj.genres?.length > 0 ? 'genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre?.genre_name) : ''}</p>
            <p className="flickCardMood">{flickObj.moods?.length > 0 ? 'moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood?.mood_name) : ''}</p>
            <p className="flickCardCastCrew">{castCrew?.length > 0 ? 'cast/crew: ' : ''}{castCrew ? castCrew.map((cc, index) => (index ? ', ' : '') + cc?.cast_crew) : ''}</p>
            <p className="flickCardRecommendedBy">{recs?.length > 0 ? 'recommended_by: ' : ''}{recs ? recs.map((rb, index) => (index ? ', ' : '') + rb?.recommended_by) : ''}</p>
            <div>{flickObj.watched ? <StarRating flickObj={flickObj} /> : null }</div>
          </div>
          <div className="flickCardBtns">
            <Link href={`/flicks/edit/${flickObj.id}`} passHref>
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
    id: PropTypes.string,
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FlickCard;
