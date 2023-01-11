/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown({ userObj }) {
  const { user } = useAuth();
  return (
    <div className="profileDropdown">
      <img src={userObj.imageUrl} alt={user.displayName} className="profileDropdownPic rounded-circle" />
      <h5 className="profileName">{user.displayName}</h5>
    </div>
  );
}

ProfileDropdown.propTypes = {
  userObj: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};
