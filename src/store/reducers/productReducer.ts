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
      console.log("action", action);
      return { ...state, searchResults: action.payload };
    case "SET_PRODUCT_DETAILS":
      console.log("reducer-SET_PRODUCT_DETAILS", action);
      return { ...state, productDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
