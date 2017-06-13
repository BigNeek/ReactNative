import { combineReducers } from 'redux';
import auth from './auth_reducer';

export default combineReducers({
  // a reducer cannot return undefined. it must return an object, string, # etc
  auth
});
