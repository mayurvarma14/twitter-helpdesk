import { SET_CURRENT_USER, IS_LOADING, SET_LOGGED_IN } from './userTypes';

const initialState = {
  data: null,
  loggedIn: false,
  isLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, data: payload };
    case IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_LOGGED_IN:
      return { ...state, loggedIn: payload };

    default:
      return state;
  }
};
