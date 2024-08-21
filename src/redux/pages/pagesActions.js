import { API } from "../../http/API"
import { ActionTypes } from "./action-types";

export const fetchPages = () => async (dispatch) => {
  const response = await API.get(`auth/pages`);
  dispatch({ type: ActionTypes.FETCH_PAGES, payload: response.data });
};

export const setPages = (pages) => {
  return {
    type: ActionTypes.SET_PAGES,
    payload: pages,
  };
};
