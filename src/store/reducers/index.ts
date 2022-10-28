import { combineReducers } from "redux";

import shoppingListReducer from "./shoppingListReducer";
import commonReducer from "./commonReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import priceHistoryReducer from "./priceHistoryReducer";

export const rootReducer = combineReducers({
    shoppingListReducer,
    commonReducer,
    shoppingCartReducer,
    priceHistoryReducer

})

export type RootState = ReturnType<typeof rootReducer>;