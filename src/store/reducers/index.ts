import { combineReducers } from "redux";

import shoppingListReducer from "./shoppingListReducer";

export const rootReducer = combineReducers({
    shoppingListReducer
})

export type RootState = ReturnType<typeof rootReducer>;