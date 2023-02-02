import { PropsWithChildren } from "react";
import { AppContextType, IShoppingList } from "../@types/app";
import { ISupermarket } from "../@types/supermarket";
import { ShoppingListContextProvider } from "../context";
import { useState, useCallback, useMemo } from "../hooks";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentShoppingList, setCurrentShoppingList] =
    useState<IShoppingList | null>(null);
  const [currentSupermarket, setCurrentSupermarket] =
    useState<ISupermarket | null>(null);

  const setShoppingList: AppContextType["setShoppingList"] = useCallback(
    async (shoppingList: IShoppingList | null) => {
      setCurrentShoppingList(shoppingList);
    },
    []
  );

  const setSupermarket: AppContextType["setSupermarket"] = useCallback(
    async (supermarket: ISupermarket | null) => {
      setCurrentSupermarket(supermarket);
    },
    []
  );

  const value = useMemo(() => {
    return {
      currentShoppingList,
      currentSupermarket,
      setShoppingList,
      setSupermarket,
    };
  }, [
    currentShoppingList,
    currentSupermarket,
    setShoppingList,
    setSupermarket,
  ]);

  return (
    <ShoppingListContextProvider value={value}>
      {children}
    </ShoppingListContextProvider>
  );
};

export default AppProvider;
