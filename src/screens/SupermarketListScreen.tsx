import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Supermarket } from "../types/Supermarket";
import { myTheme } from "../theme/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { useInfiniteQuery, useQuery } from "react-query";
import { LocationObject } from "expo-location";
import {
  searchSupermarket,
  setSupermarketSelected,
} from "../store/actions/supermarketActions";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";

const DISTANCES = [
  { id: "1km", value: 1000 },
  { id: "5km", value: 5000 },
  { id: "10km", value: 10000 },
];

const SupermarketListScreen = () => {
  const [location, setLocation] = useState<LocationObject>();
  const [isLoadingLocation, setLoadingLocation] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const [distance, setDistance] = useState(DISTANCES[0]);
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<Supermarket | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleInputChange = (text: string) => {
    setInputText(text);
    setShowClearIcon(text.length > 0);
  };

  const handleClearInput = () => {
    setInputText("");
    setSearchText("");
    setShowClearIcon(false);
  };

  const handlerSearch = () => {
    setSearchText(inputText);
  };

  const handleDistanceChange = (selectedDistance: (typeof DISTANCES)[0]) => {
    setDistance(selectedDistance);
  };

  const setSupermarket = (item: Supermarket | null) => {
    if (item != null) {
      dispatch(setSupermarketSelected(item));
      //@ts-ignore
      navigation.navigate("PriceHistoryResumeScreen");
    }
  };

  const renderItem = ({ item }: { item: Supermarket }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedSupermarket?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => {
        if (selectedSupermarket?.id == item.id) {
          setSelectedSupermarket(null);
          setShowNextButton(false);
        } else {
          setShowNextButton(true);
          setSelectedSupermarket(item);
        }
      }}
    >
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.distanceIconContainer}>
        <Icon name="map-marker-distance" size={20} color="#000" />
        <Text style={styles.distance}>
          {(item.distance / 1000).toFixed(2)}km
        </Text>
      </View>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location: LocationObject = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoadingLocation(false);
    })();
  }, []);

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(
      [
        "supermarkets",
        location?.coords.latitude,
        location?.coords.longitude,
        distance,
        searchText,
      ],
      ({ pageParam = 1 }) =>
        searchSupermarket(
          pageParam,
          location?.coords.latitude,
          location?.coords.longitude,
          distance.value,
          searchText
        ),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage.last) {
            return lastPage.pageNo + 1;
          }
          return false;
        },
        enabled: location != null,
      }
    );

  useEffect(() => {
    if (data?.pages) {
      console.log(data.pages);
    }
  }, [data]);

  return (
    <Container
      style={styles.container}
      isLoading={isLoadingLocation}
      error={error}
      loadingMessage="Carregando sua localização"
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={handleInputChange}
          value={inputText}
          placeholder="Pesquisar supermercados"
        />
        {showClearIcon && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearInput}
          >
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handlerSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.distanceContainer}>
        {DISTANCES.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[
              styles.distanceButton,
              distance.value === d.value && styles.distanceButtonActive,
            ]}
            onPress={() => handleDistanceChange(d)}
          >
            <Text style={styles.distanceButtonText}>{d.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isLoading ? (
        <ActivityIndicator size={80} style={styles.loading} />
      ) : (
        data?.pages && (
          <>
            <FlatList
              data={data.pages.map((page) => page.items).flat()}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />
            {showNextButton && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => setSupermarket(selectedSupermarket)}
              >
                <Text style={styles.nextButtonText}>Avançar</Text>
              </TouchableOpacity>
            )}
          </>
        )
      )}
    </Container>
    // <View style={styles.container}>
    //   <View style={styles.searchContainer}>
    //     <TextInput
    //       style={styles.searchInput}
    //       onChangeText={handleInputChange}
    //       value={inputText}
    //       placeholder="Pesquisar supermercados"
    //     />
    //     {showClearIcon && (
    //       <TouchableOpacity
    //         style={styles.clearButton}
    //         onPress={handleClearInput}
    //       >
    //         <Icon name="close" size={24} color="#000" />
    //       </TouchableOpacity>
    //     )}
    //     <TouchableOpacity onPress={handlerSearch} style={styles.searchButton}>
    //       <Text style={styles.searchButtonText}>Buscar</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.distanceContainer}>
    //     {DISTANCES.map((d) => (
    //       <TouchableOpacity
    //         key={d.id}
    //         style={[
    //           styles.distanceButton,
    //           distance.value === d.value && styles.distanceButtonActive,
    //         ]}
    //         onPress={() => handleDistanceChange(d)}
    //       >
    //         <Text style={styles.distanceButtonText}>{d.id}</Text>
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    //   {isLoading ? (
    //     <ActivityIndicator size={80} style={styles.loading} />
    //   ) : (
    //     data?.pages && (
    //       <>
    //         <FlatList
    //           data={data.pages.map((page) => page.items).flat()}
    //           renderItem={renderItem}
    //           keyExtractor={(item) => item.id}
    //           style={styles.list}
    //         />
    //         {showNextButton && (
    //           <TouchableOpacity
    //             style={styles.nextButton}
    //             onPress={() => setSupermarket(selectedSupermarket)}
    //           >
    //             <Text style={styles.nextButtonText}>Avançar</Text>
    //           </TouchableOpacity>
    //         )}
    //       </>
    //     )
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "10%",
  },
  clearButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loading: {
    alignSelf: "center",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: myTheme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  distance: {
    marginLeft: 10,
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  distanceIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  distanceButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  distanceButtonActive: {
    backgroundColor: myTheme.colors.primary,
  },
  distanceButtonText: {
    color: "#000",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
  list: {
    flexGrow: 1,
  },
  selectedItem: {
    backgroundColor: "#F5F5F5",
    borderWidth: 5,
    borderColor: myTheme.colors.success,
  },
  nextButton: {
    backgroundColor: myTheme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },

  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SupermarketListScreen;
