import axios from 'axios';
import { browserHistory } from 'react-router';

import { SET_CURRENT_USER, IS_LOADING, SET_LOGGED_IN } from './userTypes';
import { getConversations } from './../tweet/tweetActions';

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/me`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: SET_CURRENT_USER, payload: data });
    if (Object.keys(data)) {
      dispatch({ type: SET_LOGGED_IN, payload: true });
      dispatch(getConversations());
    } else {
      browserHistory.push('/login');
    }
    dispatch({ type: IS_LOADING, payload: false });
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
