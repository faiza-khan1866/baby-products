import { put, takeLatest, select } from "redux-saga/effects";
// import { toast } from "react-toastify";
import { types } from "./types";
import * as service from "./service";
import { history } from "./../../history";
// import * as selectors from './selectors';

function* getAllProducts(action) {
  try {
    const result = yield service.getAllProducts(action.payload.page);
    if (result.status === 200) {
      if (action.payload.page === "all") {
        yield put({
          type: "GET_ALL_PRODUCTS_SUCCESS",
          payload: {
            products: result.data.data,
          },
        });
      } else {
        yield put({
          type: types.GET_PRODUCTS_SUCCESS,
          payload: {
            products: result.data.data,
            totalProducts: result.data.total,
          },
        });
      }

      // history.push("/");
    } else {
      yield put({
        type: types.GET_PRODUCTS_FAILURE,
        // payload: result.message.data.message,
      });

      // toast.error(result.message.message.toString());
    }
  } catch (error) {
    // if (error.response) {
    //   const errorMessage = error.response.data.message;
    //   // toast.error(errorMessage);
    //   yield put({ type: types.GET_PRODUCTS_FAILURE, payload: errorMessage });
    // } else if (error.request) {
    //   const errorMessage = "Error. Please check your internet connection.";
    //   // toast.error(errorMessage);
    //   yield put({ type: types.GET_PRODUCTS_FAILURE, payload: errorMessage });
    // } else {
    //   const errorMessage = "There was some error.";
    // toast.error(errorMessage);
    yield put({
      type: types.GET_PRODUCTS_FAILURE,
      payload: "There was some error",
    });
    // }
  }
}

function* getAllCategories(action) {
  try {
    const result = yield service.getAllCategories();
    if (result.status === 200) {
      yield put({
        type: types.GET_CATEGORIES_SUCCESS,
        payload: {
          categories: result.data,
        },
      });
    } else {
      yield put({
        type: types.GET_CATEGORIES_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CATEGORIES_FAILURE,
      payload: "There was some error",
    });
  }
}

function* getCategoryProducts(action) {
  // console.log("action.payload.subcategory :: ", action.payload.subcategory)
  // console.log("action.payload.filter :: ", action.payload.filter)
  try {
    const result = yield service.getCategoryProducts(
      action.payload.category,
      action.payload.page,
      action.payload.subcategory,
      action.payload.filter
    );
    if (result.status === 200) {
      if (action.payload.page === "all") {
        yield put({
          type: "GET_ALL_CATEGORY_PRODUCTS_SUCCESS",
          payload: {
            products: result.data.data,
            totalProducts: result.data.total,
          },
        });
      } else {
        yield put({
          type: types.GET_CATEGORY_PRODUCTS_SUCCESS,
          payload: {
            products: result.data.data,
            totalProducts: result.data.total,
            page: action.payload.page,
          },
        });
      }
    } else {
      yield put({
        type: types.GET_CATEGORY_PRODUCTS_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_CATEGORY_PRODUCTS_FAILURE,
      payload: "There was some error",
    });
  }
}

export default function* productsWatcher() {
  yield takeLatest(types.GET_PRODUCTS_REQUEST, getAllProducts);
  yield takeLatest(types.GET_CATEGORIES_REQUEST, getAllCategories);
  yield takeLatest(types.GET_CATEGORY_PRODUCTS_REQUEST, getCategoryProducts);
}
