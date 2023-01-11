import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createUser, getUserByUid } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  imageUrl: '',
  uid: '',
};

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        // if fbuser.uid exists in database continue, if it doesn't, you need to create the user then continue.
        getUserByUid(fbUser.uid).then((appUser) => {
          if (appUser) {
            setUser(fbUser);
          } else {
            initialState.uid = fbUser.uid;
            createUser(initialState).then(() => {
              setUser(fbUser);
            });
          }
        });
        // you need to make sure there is a user in your database tied to the firebase user for the app to work.
      } else {
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
