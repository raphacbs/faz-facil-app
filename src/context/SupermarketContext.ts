import { SupermarketContextType } from "../@types/supermarket";
import createGenericContext from "../utils/createGenericContext";

export const [useSupermarketContext, SupermarketContextProvider] =
  createGenericContext<SupermarketContextType>("SupermarketContext");
