import { AppContextType } from "../@types/app";
import createGenericContext from "../utils/createGenericContext";

export const [useAppContext, ShoppingListContextProvider] =
  createGenericContext<AppContextType>("AppContext");
