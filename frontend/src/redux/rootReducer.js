import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import tweetReducer from './tweet/tweetReducer';

export default combineReducers({
  user: userReducer,
  tweet: tweetReducer,
});
