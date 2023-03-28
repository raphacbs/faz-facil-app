import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
