import { types } from "./types";
let initialState = {
  showSpinner: false,
  showSpinnerForCatProds: false,
  activeLanguage: "",
  pages: [],
  loginInvoker: ""
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SPINNER: {
      return {
        ...state,
        showSpinner: true,
      };
    }
    case 'SHOW_SPINNER_FOR_CAT_PRODS': {
      return {
        ...state,
        showSpinnerForCatProds: true,
      };
    }
    case 'HIDE_SPINNER_FOR_CAT_PRODS':
      return {
        ...state,
        showSpinnerForCatProds: false,
      };

    case types.HIDE_SPINNER:
      return {
        ...state,
        showSpinner: false,
      };
    case "SET_ACTIVE_LANGUAGE_SUCCESS":
      // debugger;
      return {
        ...state,
        activeLanguage: action.payload.language,
      };
    case "SET_PAGES_SUCCESS":
      // debugger;
      return {
        ...state,
        pages: action.payload.pages || [],
      };
    case "LOGIN_INVOKER":
      // debugger;
      return {
        ...state,
        loginInvoker: action.payload.invoker || "",
      };

    default: {
      return state;
    }
  }
};
export default globalReducer;
