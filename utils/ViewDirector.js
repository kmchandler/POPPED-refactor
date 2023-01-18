import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import { getUserByUid } from '../api/userData';
import CreateUserForm from '../components/CreateUserForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (user) {
      getUserByUid(user.uid).then((result) => {
        setProfile(result);
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
        <div className="container">{'valid' in user ? <CreateUserForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
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
