import axios from 'axios';

import {
  SET_CONVERSATIONS,
  IS_LOADING_CONVERSATIONS,
  SET_CONVERSATION,
  IS_LOADING_CONVERSATION,
  SET_REPLY,
  ADD_TWEET_CONVERSATION,
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
export const sendReply = (text, to) => async (dispatch) => {
  try {
    const { data: tweet } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/tweet`,
      { text, to },
      {
        withCredentials: true,
      }
    );
    const payload = {
      userId: '1314286448388923392',
      tweetId: tweet.id_str,
      from: {
        twitterId: tweet.user.id_str,
        name: tweet.user.name,
        screenName: tweet.user.screen_name,
        location: tweet.user.location,
        profileImage: tweet.user.profile_image_url_https,
      },
      text: tweet.text,
      timestamp: tweet.created_at,
      inReplyToStatusId: tweet.in_reply_to_status_id_str,
      inReplyToUserId: tweet.in_reply_to_user_id_str,
    };
    dispatch({ type: SET_REPLY, payload });
  } catch (error) {
    console.error('Error sending reply', error);
  }
};
export const addReply = (tweet) => async (dispatch) => {
  dispatch({ type: SET_REPLY, payload: tweet });
};
export const addTweetConversation = (tweet) => async (dispatch) => {
  dispatch({ type: ADD_TWEET_CONVERSATION, payload: tweet });
};
