import { Product } from "../../types/Product";

export const setSearchTerm = (term: string) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

// export const setSearchResults = (results: Array<Product>) => ({
//   type: "SET_SEARCH_RESULTS",
//   payload: results,
// });

export const setSearchResults: any = (results: Array<Product>) => {
  return (dispatch: any) => {
    dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: results,
    });
  };
};

export const setProductDetails = (product: Product) => ({
  type: "SET_PRODUCT_DETAILS",
  payload: product,
});
