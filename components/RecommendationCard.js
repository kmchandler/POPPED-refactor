import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsEyeglasses } from 'react-icons/bs';

function RecommendationCard({ flickObj }) {
  const glasses = <BsEyeglasses />;

  return (
    <>
      <Card className="flickCardDiv recommendationCardDiv" style={{ width: '25rem', margin: '10px', height: '55rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.imageUrl} alt={flickObj.title} style={{ height: '550px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="flickTitle">{flickObj.title.toLowerCase()} {flickObj.favorite ? '⭐' : null} {flickObj.watched ? glasses : null}</Card.Title>
          <hr />
          <div className="cardDetails">
            <p className="flickCardType">type: {flickObj.type.toLowerCase()}</p>
            <p className="flickCardGenre">{flickObj.genres?.length > 0 ? 'genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre?.genreName) : ''}</p>
            <p className="flickCardMood">{flickObj.moods?.length > 0 ? 'moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood?.moodsName) : ''}</p>
            <p className="flickCardCastCrew">{flickObj.castCrew ? 'cast/crew: ' : ''}{flickObj.castCrew ? flickObj.castCrew.toLowerCase() : null}</p>
            <p className="flickCardRecommendedBy">{flickObj.recommendedBy ? 'recommended by: ' : ''}{flickObj.recommendedBy.toLowerCase() ? flickObj.recommendedBy : ''}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

RecommendationCard.propTypes = {
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
};

export default RecommendationCard;
