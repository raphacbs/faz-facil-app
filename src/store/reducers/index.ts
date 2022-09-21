import { combineReducers } from "redux";

import shoppingListReducer from "./shoppingListReducer";
import commonReducer from "./commonReducer";
import shoppingCartReducer from "./shoppingCartReducer";

export const rootReducer = combineReducers({
    shoppingListReducer,
    commonReducer,
    shoppingCartReducer
})

export type RootState = ReturnType<typeof rootReducer>;