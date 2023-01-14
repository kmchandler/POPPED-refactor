import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const onUpdate = useMemo(
    () => (uid) => checkUser(uid).then((userInfo) => {
      setUser({ fbUser: oAuthUser, ...userInfo });
    }),
    [oAuthUser],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((userInfo) => {
          let userObj = {};
          if ('null' in userInfo) {
            userObj = userInfo;
          } else {
            userObj = { fbUser, uid: fbUser.uid, ...userInfo };
          }
          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo(
    // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      onUpdate,
      userLoading: user === null || oAuthUser === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user, oAuthUser, onUpdate],
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
