/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import ProfileCard from '../../components/ProfileCard';
import { getFlicksByUidWithMetaData, getSingleUserWithMetaData } from '../../api/mergedData';

  <Head>
    <title>POPPED:profile</title>
    <meta name="profile" content="profile page" />
  </Head>;

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [flicks, setFlicks] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getTheUser = async () => {
    const fetchedProfile = await getSingleUserWithMetaData(id);
    setProfile(fetchedProfile);
  };

  const getAllTheFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
  };

  useEffect(() => {
    getTheUser();
    getAllTheFlicks();
  }, []);
  if (!profile) {
    return null;
  }

  return (
    <div className="userProfileDiv">
      <div className="profileBtn">
        <Link passHref href={`/users/edit/${profile.id}`}>
          <button className="profileButton" type="submit">{profile.id ? 'update' : 'create'} profile</button>
        </Link>
      </div>
      <ProfileCard userObj={profile} flicksList={flicks} />
    </div>
  );
}

Profile.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    genres: PropTypes.objectOf(PropTypes.string),
    imageUrl: PropTypes.string,
    userFirebaseKey: PropTypes.string,
  }),
};
Profile.defaultProps = {
  userObj: {},
};
