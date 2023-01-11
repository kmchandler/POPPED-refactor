import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsEyeglasses } from 'react-icons/bs';
import StarRating from './StarRating';

function ShuffleCard({ watchObj }) {
  const glasses = <BsEyeglasses />;

  return (
    <div>
      <Card className="shuffleCardDiv" style={{ width: '25rem', margin: '10px' }}>
        <Card.Img className="cardImage" variant="top" src={watchObj.imageUrl} alt={watchObj.title} style={{ height: '550px' }} />
        <Card.Body className="shuffleCard">
          <Card.Title className="watchTitleShuffle">{watchObj.title.toLowerCase()} {watchObj.favorite ? '⭐' : null} {watchObj.watched ? glasses : null}</Card.Title>
          <hr />
          <div className="cardDetails">
            <p className="flickCardType">type: {watchObj.type.toLowerCase()}</p>
            <p className="watchCardGenre">{watchObj.genres?.length > 0 ? 'genres: ' : ''}{watchObj.genres ? watchObj.genres.map((genre, index) => (index ? ', ' : '') + genre.genreName) : ''}</p>
            <p className="playerCardJobs">{watchObj.moods?.length > 0 ? 'moods: ' : ''}{watchObj.moods ? watchObj.moods.map((mood, index) => (index ? ', ' : '') + mood.moodsName) : ''}</p>
            <p className="watchCardCastCrew">{watchObj.castCrew ? 'cast/crew: ' : ''}{watchObj.castCrew ? watchObj.castCrew.toLowerCase() : ''}</p>
            <p className="watchCardRecommendedBy">{watchObj.recommendedBy ? 'recommended by: ' : ''}{watchObj.recommendedBy ? watchObj.recommendedBy.toLowerCase() : ''}</p>
            <div>{watchObj.watched ? <StarRating flickObj={watchObj} /> : null }</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

ShuffleCard.propTypes = {
  watchObj: PropTypes.shape({
    watch: PropTypes.string,
    watchsFirebaseKey: PropTypes.string,
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

export default ShuffleCard;
