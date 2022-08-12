import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import ShoppingListComponent from "../components/ShoppingListComponent";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import TouchableScale from "react-native-touchable-scale";
import { SearchBar } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";

export default function ListShoppingScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [fullData, setFullData] = useState([]);

  const onRefresh = () => {
    setIsFetching(true);
    getShoppingList();
    setIsFetching(false);
  };

  const getShoppingList = async () => {
    try {
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts?isArchived=false`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setFullData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const archive = async (item) => {
    try {
      item.isArchived = true;
      const body = {
        id: item.id,
        description: item.description,
        supermarket: item.supermarket,
        archived: true,
      };

      const url = `${BASE_URL_DEV}/api/v1/shopping-carts`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      onRefresh();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getShoppingList();
    }, [])
  );

  useEffect(() => {
    getShoppingList();
  }, []);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95}
      onPress={() => {
        navigation.navigate("ShoppingCart", {
          id: item.id,
          name: item.description,
        });
      }}
      leftContent={(reset) => (
        <Button
          title="Editar"
          onPress={() => {
            navigation.navigate("CreateShoppingList", item);
            reset();
          }}
          icon={{ name: "edit", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Arquivar"
          onPress={() => {
            archive(item);
            reset();
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <ListItem.Content>
        <ShoppingListComponent shoppingList={item}></ShoppingListComponent>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );

  const updateSearch = (search) => {
    setSearch(search);
    console.log(search);
    let filteredData = fullData.filter((x) =>
      x.description.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredData);
    setData(search == "" ? fullData : filteredData);
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      <SearchBar
        platform="android"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={updateSearch}
        onClearText={() => console.log(onClearText())}
        placeholder="pesquisar"
        placeholderTextColor="#888"
        cancelButtonTitle="Cancelar"
        cancelButtonProps={{}}
        value={search}
      />
      {isLoading ? (
        <ActivityIndicator
          style={{
            justifyContent: "center",
            flexDirection: "column",
            alignSelf: "center",
          }}
          size={100}
        />
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      )}
      {/* <FAB
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingVertical: 50,
          paddingRight: 50,
          flexGrow: 1,
        }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="green"
      /> */}
    </View>
  );
}
