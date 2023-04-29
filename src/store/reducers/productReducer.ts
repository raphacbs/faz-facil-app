import { InitialState, Product } from "../../types/Product";

const initialState: InitialState = {
  searchTerm: "",
  searchResults: [],
  productDetails: {
    brand: "",
    code: "",
    createdAt: "",
    description: "",
    updateAt: "",
    priceHistories: [],
    thumbnail: "",
    unit: "",
  },
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SEARCH_RESULTS":
      if (state.productDetails) {
        const product = action.payload.find(
          (p: Product) => p.code == state.productDetails.code
        );
        return {
          ...state,
          searchResults: action.payload,
          productDetails: product,
        };
      }
      return { ...state, searchResults: action.payload };
    case "SET_PRODUCT_DETAILS":
      return { ...state, productDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
