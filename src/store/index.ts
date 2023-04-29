import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import priceHistoryReducer from "./reducers/priceHistoryReducer";

const rootReducer = combineReducers({
  product: productReducer,
  priceHistory: priceHistoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
