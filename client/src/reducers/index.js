import { combineReducers } from 'redux';

// We will create 4 different reducers and importing them here
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile
});
