import { ShoppingListContextType } from "../@types/shoppingList";
import createGenericContext from "../utils/createGenericContext";

export const [useShoppingListContext, ShoppingListContextProvider] =
  createGenericContext<ShoppingListContextType>("ShoppingListContext");
