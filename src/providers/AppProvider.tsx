import { FC, PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import ShoppingListProvider from "./ShoppingListProvider";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ShoppingListProvider>{children}</ShoppingListProvider>
    </AuthProvider>
  );
};

export default AppProvider;
