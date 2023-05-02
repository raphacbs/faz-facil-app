import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import priceHistoryReducer from "./reducers/priceHistoryReducer";
import supermarketReducer from "./reducers/supermarketReducer";

const rootReducer = combineReducers({
  product: productReducer,
  priceHistory: priceHistoryReducer,
  supermarket: supermarketReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
