/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown({ userObj }) {
  const { user } = useAuth();
  return (
    <div className="profileDropdown">
      <img src={userObj.image_url} alt={user.username} className="profileDropdownPic rounded-circle" />
      <h5 className="profileName">{user.username}</h5>
    </div>
  );
}

ProfileDropdown.propTypes = {
  userObj: PropTypes.shape({
    image_url: PropTypes.string,
  }).isRequired,
};
