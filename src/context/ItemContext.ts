import { ItemContextType } from "../@types/item";
import createGenericContext from "../utils/createGenericContext";

export const [useItemContext, ItemContextProvider] =
  createGenericContext<ItemContextType>("ItemContext");
