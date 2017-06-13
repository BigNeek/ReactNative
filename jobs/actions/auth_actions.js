import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

// How to use async storage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');
// AsyncStorage returns a promise

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  // this Facebook.logInWithReadPermissionsAsync with create a modal within the
  // app which will prompt the user to log into their fb account. Once the user
  // does this it will return a token. This is
  // obviously async which is why we are using async/await.
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('117933465464109', {
    permissions: ['public_profile']
  });

  if (type === 'catch') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
