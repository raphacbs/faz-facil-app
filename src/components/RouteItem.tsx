import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RouteScreenProps } from "react-native-actions-sheet";
import { Item } from "../types/Item";

interface RouteItemProps {
  router: RouteScreenProps;
  item: Item;
}

const RouteItem: React.FC<RouteItemProps> = ({ item, router }) => {
  const [localItem, setLocalItem] = useState<Item>(item);

  return <View></View>;
};

export default RouteItem;
