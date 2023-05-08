import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import priceHistoryReducer from "./reducers/priceHistoryReducer";
import supermarketReducer from "./reducers/supermarketReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  product: productReducer,
  priceHistory: priceHistoryReducer,
  supermarket: supermarketReducer,
  userInfo: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
