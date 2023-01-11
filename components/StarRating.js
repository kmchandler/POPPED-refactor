/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateFlick } from '../api/flicksData';

const StarRating = ({ flickObj }) => {
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setHover(flickObj.rating);
  }, []);

  const handleClick = (index) => {
    flickObj.rating = index;
    updateFlick(flickObj);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;

        return (
          <button
            type="button"
            key={index}
            className={index <= ((flickObj.rating && hover) || hover) ? 'on' : 'off'}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(flickObj.rating)}
            value={index}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  flickObj: PropTypes.shape({
    rating: PropTypes.string,
  }).isRequired,
};

export default StarRating;
