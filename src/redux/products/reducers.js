import { types } from "./types";
import { REHYDRATE } from "redux-persist/lib/constants";

let initialState = {
  allProducts: [],
  userWishlistProducts: [],
  products: [],
  categoryProducts: [],
  categories: [],
  totalProducts: 0,
  message: false,
  searchData: {
    products: [],
    categories: [],
  },
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload.products],
        totalProducts: action.payload.totalProducts,
      };
    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        allProducts: [...action.payload.products],
      };
    case "GET_WISHLIST_SUCCESS":
      return {
        ...state,
        userWishlistProducts: [...action.payload.wishlist],
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [
          ...action.payload.categories?.sort((a, b) => a.order - b.order),
        ],
      };
    case types.GET_CATEGORY_PRODUCTS_SUCCESS:
      let text = "";
      if (!action.payload.totalProducts > 0) {
        text = true;
      } else {
        text = false;
      }

      return {
        ...state,
        products: [...action.payload.products],
        totalProducts: action.payload.totalProducts,
        message: text,
      };
    case "GET_ALL_CATEGORY_PRODUCTS_SUCCESS":
      // debugger;
      return {
        ...state,
        categoryProducts: [...action.payload.products],
      };

    case "EMPTY_PRODUCTS":
      return { ...state, products: [], totalProducts: 0 };

    case REHYDRATE: {
      let stateWithProducts = JSON.parse(JSON.stringify(action.payload || ""));
      let prodReducer = stateWithProducts.productReducer || [];
      prodReducer.allProducts = [];
      prodReducer.categoryProducts = [];
      prodReducer.products = [];
      prodReducer.totalProducts = [];
      prodReducer.userWishlistProducts = [];
      prodReducer.categories = prodReducer.categories || [];
      return prodReducer;
    }

    default: {
      return state;
    }
  }
};
