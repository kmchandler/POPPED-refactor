import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import { getUserByUid } from '../api/userData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (user) {
      getUserByUid(user.uid).then((result) => {
        if (!result.id) {
          Router.push('/users/new');
        } else if (result) {
          setProfile(result);
        }
      });
    }
  }, [user]);

  if (userLoading) {
    return <Loading />;
  }

  if (user && profile) {
    return (
      <>
        <NavBar navObj={profile} />
        <div className="container"><Component {...pageProps} /></div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
