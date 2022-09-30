import React from "react";
import { VStack } from "native-base";
import EmptyCartItems from "./EmptyCartItems";
import EmptyShoppingList from "./EmptyShoppingList";
import EmptyListDefault from "./EmptyListDefault";

interface Props {
  type: "CartItem" | "ShoppingList" | "default";
  onPressAddButton?: () => void;
  showAddButton: boolean;
}

const EmptyListContainer = (props: Props) => {
  const { type, showAddButton, onPressAddButton } = props;

  const handleContent = () => {
    switch (type) {
      case "ShoppingList":
        return (
          <EmptyShoppingList
            showAddButton={showAddButton}
            onPressAddButton={onPressAddButton}
          />
        );
      case "CartItem":
        return (
          <EmptyCartItems
            showAddButton={showAddButton}
            onPressAddButton={onPressAddButton}
          />
        );
      default:
        return <EmptyListDefault showAddButton />;
    }
  };

  return <VStack>{handleContent()}</VStack>;
};

export default EmptyListContainer;
