import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import priceHistoryReducer from "./reducers/priceHistoryReducer";
import supermarketReducer from "./reducers/supermarketReducer";
import userReducer from "./reducers/userReducer";
import shoppingListReducer from "./reducers/shoppingListReducer";
import itemReducer from "./reducers/itemReducer";
import unitReducer from "./reducers/unitReducer";

const rootReducer = combineReducers({
  product: productReducer,
  priceHistory: priceHistoryReducer,
  supermarket: supermarketReducer,
  userInfo: userReducer,
  shoppingList: shoppingListReducer,
  item: itemReducer,
  unit: unitReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
