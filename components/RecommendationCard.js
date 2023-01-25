import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsEyeglasses } from 'react-icons/bs';

function RecommendationCard({ flickObj }) {
  const glasses = <BsEyeglasses />;

  return (
    <>
      <Card className="flickCardDiv recommendationCardDiv" style={{ width: '25rem', margin: '10px', height: '55rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.image_url} alt={flickObj.title} style={{ height: '550px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="flickTitle">{flickObj.title.toLowerCase()} {flickObj.favorite ? '⭐' : null} {flickObj.watched ? glasses : null}</Card.Title>
          <hr />
          <div className="cardDetails">
            <p className="flickCardType">type: {flickObj.type.toLowerCase()}</p>
            <p className="flickCardGenre">{flickObj.genres?.length > 0 ? 'genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre?.genre_name) : ''}</p>
            <p className="flickCardMood">{flickObj.moods?.length > 0 ? 'moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood?.mood_name) : ''}</p>
            <p className="flickCardCastCrew">{flickObj.cast_crew ? 'cast/crew: ' : ''}{flickObj.cast_crew ? flickObj.cast_crew.toLowerCase() : null}</p>
            <p className="flickCardRecommendedBy">{flickObj.recommended_by ? 'recommended by: ' : ''}{flickObj.recommended_by ? flickObj.recommended_by : ''}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

RecommendationCard.propTypes = {
  flickObj: PropTypes.shape({
    flick: PropTypes.string,
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
  }).isRequired,
};

export default RecommendationCard;
