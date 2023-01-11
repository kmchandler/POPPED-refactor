import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsEyeglasses } from 'react-icons/bs';

function FavoritedFlicksCard({ flickObj }) {
  const glasses = <BsEyeglasses />;

  return (
    <>
      <Card className="flickCardDiv" style={{ width: '25rem', margin: '10px', height: '55rem' }}>
        <Card.Img className="cardImage" variant="top" src={flickObj.imageUrl} alt={flickObj.title} style={{ height: '550px' }} />
        <Card.Body className="cardBody flickCardBody">
          <Card.Title className="favFlickTitle">{flickObj.title.toLowerCase()} {flickObj.favorite ? '⭐' : null} {flickObj.watched ? glasses : null}</Card.Title>
          <hr />
          <p className="flickCardType">Type: {flickObj.type}</p>
          <p className="flickCardGenre">{flickObj.genres.length > 0 ? 'Genres: ' : ''}{flickObj.genres ? flickObj.genres.map((genre, index) => (index ? ', ' : '') + genre?.genreName) : ''}</p>
          <p className="flickCardMood">{flickObj.moods.length > 0 ? 'Moods: ' : ''}{flickObj.moods ? flickObj.moods.map((mood, index) => (index ? ', ' : '') + mood?.moodsName) : ''}</p>
          <p className="flickCardCastCrew">{flickObj.castCrew ? 'Cast/Crew: ' : ''}{flickObj.castCrew ? flickObj.castCrew : null}</p>
          <p className="flickCardRecommendedBy">{flickObj.recommendedBy ? 'Recommended By: ' : ''}{flickObj.recommendedBy ? flickObj.recommendedBy : ''}</p>
        </Card.Body>
      </Card>
    </>
  );
}

FavoritedFlicksCard.propTypes = {
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

export default FavoritedFlicksCard;
