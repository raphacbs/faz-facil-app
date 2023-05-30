import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Container from "../components/Container";
import { ShoppingList } from "../types/ShoppingList";
import ShoppingListBlock from "../components/ShoppingListBlock";
import { useQuery } from "react-query";

import { FAB } from "react-native-elements";
import { myTheme } from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import {
  getShoppingList,
  setSelectedShoppingList,
} from "../store/actions/shoppingListAction";

const mockShoppingLists: ShoppingList[] = [
  {
    id: "1",
    description: "Lista de Compras 1",
    supermarketId: "1",
    supermarketName: "Supermercado 1",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-01",
    status: "Em andamento",
    itemsInfo: {
      quantityPlannedProduct: 5,
      quantityAddedProduct: 3,
      plannedTotalValue: 50.0,
      totalValueAdded: 30.0,
    },
  },
  {
    id: "2",
    description: "Lista de Compras 2",
    supermarketId: "2",
    supermarketName: "Supermercado 2",
    createdAt: "2023-05-02",
    updatedAt: "2023-05-02",
    status: "Concluída",
    itemsInfo: {
      quantityPlannedProduct: 8,
      quantityAddedProduct: 8,
      plannedTotalValue: 80.0,
      totalValueAdded: 80.0,
    },
  },
  {
    id: "3",
    description: "Lista de Compras 3",
    supermarketId: "3",
    supermarketName: "Supermercado 3",
    createdAt: "2023-05-03",
    updatedAt: "2023-05-03",
    status: "Em andamento",
    itemsInfo: {
      quantityPlannedProduct: 10,
      quantityAddedProduct: 5,
      plannedTotalValue: 100.0,
      totalValueAdded: 50.0,
    },
  },
  {
    id: "4",
    description: "Lista de Compras 4",
    supermarketId: "4",
    supermarketName: "Supermercado 4",
    createdAt: "2023-05-04",
    updatedAt: "2023-05-04",
    status: "Em andamento",
    itemsInfo: {
      quantityPlannedProduct: 6,
      quantityAddedProduct: 4,
      plannedTotalValue: 60.0,
      totalValueAdded: 40.0,
    },
  },
  {
    id: "5",
    description: "Lista de Compras 5",
    supermarketId: "5",
    supermarketName: "Supermercado 5",
    createdAt: "2023-05-05",
    updatedAt: "2023-05-05",
    status: "Concluída",
    itemsInfo: {
      quantityPlannedProduct: 12,
      quantityAddedProduct: 12,
      plannedTotalValue: 120.0,
      totalValueAdded: 120.0,
    },
  },
];

const HomeScreen = () => {
  //@ts-ignore
  const isLogged = useSelector((state) => state.userInfo.isLogged);
  const navigation = useNavigation();
  const {
    data,
    isLoading: loadingShoppingList,
    isError,
    error,
  } = useQuery({
    queryKey: ["shoppingLists"],
    queryFn: () => getShoppingList(1, null),
    enabled: isLogged,
  });

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.block}>
      {isLogged ? (
        <>
          <Container
            style={styles.container}
            isLoading={loadingShoppingList}
            error={error}
            isLogged={isLogged}
          >
            <View style={styles.title}>
              <Text style={styles.shoppingListBlock}>Minhas Listas</Text>
              <TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  navigation.navigate("MyShoppingListsScreen");
                }}
                style={styles.textAllShoppingLists}
              >
                <Text style={styles.textLink}>Ver todas</Text>
                <Icon
                  name="arrowright"
                  size={20}
                  color={myTheme.colors.primary}
                />
              </TouchableOpacity>
            </View>

            <ShoppingListBlock
              shoppingLists={data ? data.items : []}
              onPressShoppingList={async (item) => {
                await dispatch(setSelectedShoppingList(item));
                //@ts-ignore
                navigation.navigate("ShoppingListScreen");
              }}
              onCreateList={function (): void {
                //@ts-ignore
                navigation.navigate({ name: "CreateShoppingListScreen" });
              }}
            />
          </Container>
          <Container
            style={styles.container}
            isLoading={loadingShoppingList}
            error={error}
          >
            <Text style={styles.shoppingListBlock}>Últimos preços</Text>
            <ShoppingListBlock
              shoppingLists={data ? data.items : []}
              onPressShoppingList={function (item: ShoppingList): void {
                console.log("Function not implemented.");
              }}
              onCreateList={function (): void {
                console.log("Function not implemented.");
              }}
            />
          </Container>
        </>
      ) : (
        <Container
          style={styles.container}
          isLoading={loadingShoppingList}
          error={error}
          isLogged={isLogged}
        >
          <></>
        </Container>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  shoppingListBlock: {
    margin: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
  block: {
    marginTop: 5,
    height: "40%",
  },
  fab: {
    alignSelf: "flex-end",

    margin: 10,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLink: {
    color: myTheme.colors.primary,
    margin: 3,
  },
  textAllShoppingLists: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default HomeScreen;
