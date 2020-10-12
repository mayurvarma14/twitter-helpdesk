import axios from 'axios';

import {
  SET_CONVERSATIONS,
  IS_LOADING_CONVERSATIONS,
  SET_CONVERSATION,
  IS_LOADING_CONVERSATION,
} from './tweetTypes';

export const getConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tweet`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: SET_CONVERSATIONS, payload: data });

    dispatch({ type: IS_LOADING_CONVERSATIONS, payload: false });
  } catch (error) {
    console.error('Error conversations', error);
  }
};

export const getConversation = (id) => async (dispatch) => {
  dispatch({ type: IS_LOADING_CONVERSATION, payload: true });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tweet/conversations/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: SET_CONVERSATION, payload: data });

    dispatch({ type: IS_LOADING_CONVERSATION, payload: false });
  } catch (error) {
    console.error('Error conversation', error);
  }
};
