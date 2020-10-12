import {
  SET_CONVERSATIONS,
  SET_CONVERSATION,
  IS_LOADING_CONVERSATIONS,
  IS_LOADING_CONVERSATION,
} from './tweetTypes';

const initialState = {
  conversation: [],
  data: [],
  isLoading: true,
  isConversationLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CONVERSATIONS:
      return { ...state, data: payload };
    case SET_CONVERSATION:
      return { ...state, conversation: payload };
    case IS_LOADING_CONVERSATIONS:
      return { ...state, isLoading: payload };
    case IS_LOADING_CONVERSATION:
      return { ...state, isConversationLoading: payload };

    default:
      return state;
  }
};
