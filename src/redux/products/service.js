import { API } from "../../http/API";

export async function getAllProducts(page) {
  return API.get(`auth/products?page=${page}`);
}

export async function getAllCategories() {
  return API.get(`category_list`);
}
export async function getCategoryProducts(category, page, subcategory, filter) {
  if (page && page != "all") {
    localStorage.setItem("page", page);
    sessionStorage.setItem("page", page);
  }

  return API.get(
    `/auth/product_list/${category || null}/${subcategory || null}/${
      filter || null
    }?page=${page || 1}`
  );
}
