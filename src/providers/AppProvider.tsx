import { FC, PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import ItemProvider from "./ItemProvider";
import ShoppingListProvider from "./ShoppingListProvider";
import SupermarketProvider from "./SupermarketProvider";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <SupermarketProvider>
          <ItemProvider>{children}</ItemProvider>
        </SupermarketProvider>
      </ShoppingListProvider>
    </AuthProvider>
  );
};

export default AppProvider;
