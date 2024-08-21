import { ActionTypes } from "./action-types";
const intialState = {
  pages: [],
};

export const pagesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PAGES:
      return { ...state, pages: payload };
    case ActionTypes.FETCH_PAGES:
      return { ...state, pages: payload };
    default:
      return state;
  }
};

