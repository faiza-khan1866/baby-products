import { types } from "./types";

export function getProducts(page) {
  return {
    type: types.GET_PRODUCTS_REQUEST,
    payload: {
      page,
    },
  };
}

export function getCategories() {
  return {
    type: types.GET_CATEGORIES_REQUEST,
  };
}

export function getCategoryProducts(category, page, subcategory, filter) {
  return {
    type: types.GET_CATEGORY_PRODUCTS_REQUEST,
    payload: {
      category,
      subcategory,
      filter,
      page,
    },
  };
}

export function getPreSearchRecords(page) {
  return {
    type: "GET_SEARCH_LIST_REQUEST",
  };
}
