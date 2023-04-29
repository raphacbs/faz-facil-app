import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import * as Location from "expo-location";
import { Supermarket } from "../types/Supermarket";
import { myTheme } from "../theme/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DISTANCES = [
  { id: "1km", value: 1 },
  { id: "5km", value: 5 },
  { id: "10km", value: 10 },
];

const SupermarketListScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [distance, setDistance] = useState(DISTANCES[0]);

  const supermarkets: Supermarket[] = [
    {
      id: "b389d1d9-a0a9-4394-8dac-9da7fbe13cd8",
      name: "BIG Bompreço",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50860-000",
      district: "Recife",
      neighbourhood: null,
      suburb: "Areias",
      street: "Avenida Capitão Gregório de Caldas",
      longitude: -34.92928228547113,
      latitude: -8.098031,
      address:
        "BIG Bompreço, Avenida Capitão Gregório de Caldas 121, Areias, Recife - PE, 50860-000, Brazil",
      placeId:
        "51685853b5f27641c059003aa8a7303220c0f00102f90119b2700e0000000092030d42494720426f6d707265c3a76f",
      distance: 1167.6,
    },
    {
      id: "368c3849-01eb-4859-8bd2-ca9a3d321832",
      name: "Karne & Keijo",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50900-400",
      district: "Recife",
      neighbourhood: null,
      suburb: "Barro",
      street: "Rodovia Governador Mário Covas",
      longitude: -34.951055467614665,
      latitude: -8.0980666,
      address:
        "Karne & Keijo, Rodovia Governador Mário Covas 3700, Barro, Recife - PE, 50900-400, Brazil",
      placeId:
        "515047bb3cbc7941c0599a1c87aa363220c0f00102f901c5621f230000000092030d4b61726e652026204b65696a6f",
      distance: 1251.89,
    },
    {
      id: "6ae365dc-ef42-4ba5-b6e6-3a1816a7471b",
      name: "Atacadão",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50860-900",
      district: "Recife",
      neighbourhood: null,
      suburb: "Estância",
      street: "Avenida Recife",
      longitude: -34.93095600082221,
      latitude: -8.0892476,
      address:
        "Atacadão, Avenida Recife, Estância, Recife - PE, 50860-900, Brazil",
      placeId:
        "51a61efeee267741c059a9e9698db82d20c0f00102f90184cab70700000000920309417461636164c3a36f",
      distance: 1267.7,
    },
    {
      id: "f7aba329-7bee-4cf6-a667-94110b218751",
      name: "Econômico",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50860-000",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ibura de Baixo",
      street: "Avenida Recife",
      longitude: -34.92804241023599,
      latitude: -8.1048884,
      address:
        "Econômico, Avenida Recife, Ibura de Baixo, Recife - PE, 50860-000, Brazil",
      placeId:
        "517741fc03ca7641c059bf3cfdb7b33520c0f00102f901f07784190000000092030a45636f6ec3b46d69636f",
      distance: 1589.74,
    },
    {
      id: "14d94e73-3392-42f5-ba09-cbd14745ea31",
      name: "Mercadinho é o Preço",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51220-230",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ibura",
      street: "Rua Professor José Brasileiro Vila Nova",
      longitude: -34.9320455,
      latitude: -8.1107227,
      address:
        "Mercadinho é o Preço, Rua Professor José Brasileiro Vila Nova, Ibura, Recife - PE, 51220-230, Brazil",
      placeId:
        "51267156444d7741c05924da4ca5b03820c0f00103f90191c9227d010000009203164d6572636164696e686f20c3a9206f20507265c3a76f",
      distance: 1789.87,
    },
    {
      id: "35bda16b-46ab-460a-827a-fc1085fdebb1",
      name: "Atacamax",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51350-410",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ibura de Baixo",
      street: "Avenida Recife",
      longitude: -34.92751429915525,
      latitude: -8.109628749999999,
      address:
        "Atacamax, Avenida Recife, Ibura de Baixo, Recife - PE, 51350-410, Brazil",
      placeId:
        "51c135abc4b87641c05938d82958313820c0f00102f901b866fb110000000092030841746163616d6178",
      distance: 1983.5,
    },
    {
      id: "f47b9bdb-e296-4004-b1bf-7c128bdb4d22",
      name: "Varejão Rende Bem",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51230-000",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ibura de Baixo",
      street: "Avenida Dois Rios",
      longitude: -34.93992940644034,
      latitude: -8.1152951,
      address:
        "Varejão Rende Bem, Avenida Dois Rios 881, Ibura de Baixo, Recife - PE, 51230-000, Brazil",
      placeId:
        "51e05319b64f7841c059836d8750083b20c0f00102f9019cc07f2500000000920312566172656ac3a36f2052656e64652042656d",
      distance: 2082.57,
    },
    {
      id: "b4d11663-26cd-4d2a-a660-d4ede3c90469",
      name: "Assaí Atacadista",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50910-380",
      district: "Recife",
      neighbourhood: null,
      suburb: "Jardim São Paulo",
      street: "Avenida Recife",
      longitude: -34.93638030844788,
      latitude: -8.077711950000001,
      address:
        "Assaí Atacadista, Avenida Recife 5777, Jardim São Paulo, Recife - PE, 50910-380, Brazil",
      placeId:
        "51489358dadb7741c059dc865912c72720c0f00102f9011bc77e3c0000000092031141737361c3ad2041746163616469737461",
      distance: 2129.8,
    },
    {
      id: "a6854808-c869-4137-8a7f-05b5ee964fc8",
      name: "Varejão Estrela",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51230-000",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ibura de Baixo",
      street: "Avenida Dois Rios",
      longitude: -34.940738208852466,
      latitude: -8.1157635,
      address:
        "Varejão Estrela, Avenida Dois Rios 111, Ibura de Baixo, Recife - PE, 51230-000, Brazil",
      placeId:
        "510a0b1b71697841c059e7e1a7b0483b20c0f00102f90157e41a2300000000920310566172656ac3a36f2045737472656c61",
      distance: 2137.17,
    },
    {
      id: "94935c56-bca1-4c52-870b-3b0e30f9c89f",
      name: "Proab Alimentos",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51345-120",
      district: "Recife",
      neighbourhood: null,
      suburb: "Loteamento 27 de Novembro",
      street: "Avenida Rio Largo",
      longitude: -34.952815439309504,
      latitude: -8.112952400000001,
      address:
        "Proab Alimentos, Avenida Rio Largo 130, Loteamento 27 de Novembro, Recife - PE, 51345-120, Brazil",
      placeId:
        "51c7aa06dcf57941c05937c46773d43920c0f00102f901139f88230000000092030f50726f616220416c696d656e746f73",
      distance: 2318.91,
    },
    {
      id: "f2b4ec97-0c2c-4061-8549-b49a74473c08",
      name: "Sttyllo Supermercado",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51350-120",
      district: "Recife",
      neighbourhood: null,
      suburb: "Ipsep",
      street: "Rua Itanagé",
      longitude: -34.92055033078252,
      latitude: -8.106206799999999,
      address:
        "Sttyllo Supermercado, Rua Itanagé 20, Ipsep, Recife - PE, 51350-120, Brazil",
      placeId:
        "51ed224f9fd47541c0594419d23f603620c0f00102f9014b77ea2800000000920314537474796c6c6f2053757065726d65726361646f",
      distance: 2373.32,
    },
    {
      id: "f96d2e3d-948d-4365-beb0-4bc626de973d",
      name: "KD Alimentos",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51340-240",
      district: "Recife",
      neighbourhood: null,
      suburb: "UR-02 - Vila Cohab",
      street: "Avenida Santa Fé",
      longitude: -34.95509454172486,
      latitude: -8.118124000000002,
      address:
        "KD Alimentos, Avenida Santa Fé, UR-02 - Vila Cohab, Recife - PE, 51340-240, Brazil",
      placeId:
        "51e7e6e27f407a41c059c042bd987c3c20c0f00102f901b04f54190000000092030c4b4420416c696d656e746f73",
      distance: 2930.23,
    },
    {
      id: "2a6b7f56-f72d-46e3-9094-d54cfdb1e0d7",
      name: "Sam's Club",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51150-902",
      district: "Recife",
      neighbourhood: null,
      suburb: "Imbiribeira",
      street: "Avenida Marechal Mascarenhas de Moraes",
      longitude: -34.91400835235862,
      latitude: -8.11434995,
      address:
        "Sam's Club, Avenida Marechal Mascarenhas de Moraes 3402, Imbiribeira, Recife - PE, 51150-902, Brazil",
      placeId:
        "515d4e5fb2fe7441c059af1b1952863a20c0f00102f901dc93643c0000000092030a53616d277320436c7562",
      distance: 3458.63,
    },
    {
      id: "9c2f1c93-873b-4cba-a33b-294d3ebd2610",
      name: "Mercado de Cavaleiro",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Jaboatão dos Guararapes",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "54250-310",
      district: "Cavaleiro",
      neighbourhood: null,
      suburb: "Cavaleiro",
      street: "Avenida Governador Agamenon Magalhães",
      longitude: -34.97200630784401,
      latitude: -8.0917748,
      address:
        "Mercado de Cavaleiro, Avenida Governador Agamenon Magalhães, Cavaleiro, Jaboatão dos Guararapes - PE, 54250-310, Brazil",
      placeId:
        "5195fdedb76a7c41c0590ff3f037fd2e20c0f00102f901db0e360d000000009203144d65726361646f20646520436176616c6569726f",
      distance: 3586.96,
    },
    {
      id: "f5eacb08-169a-4602-9533-7122c8c151d5",
      name: "Mercadinho Central",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51320-540",
      district: "Recife",
      neighbourhood: null,
      suburb: "Zumbi do Pacheco",
      street: "Avenida João Rio Branco de Lima",
      longitude: -34.953089664766246,
      latitude: -8.1276494,
      address:
        "Mercadinho Central, Avenida João Rio Branco de Lima, Zumbi do Pacheco, Recife - PE, 51320-540, Brazil",
      placeId:
        "51cd2a97dcfe7941c0599eaf906c5b4120c0f00102f901694fab22000000009203124d6572636164696e686f2043656e7472616c",
      distance: 3753.76,
    },
    {
      id: "be1d8ac5-8b3a-4158-92e9-fffc2f5aaa42",
      name: "Supermercado Trevo",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51302-040",
      district: "Recife",
      neighbourhood: null,
      suburb: "UR-10 Ibura",
      street: "Rua General Coelho Cintra",
      longitude: -34.94897349148639,
      latitude: -8.13339365,
      address:
        "Supermercado Trevo, Rua General Coelho Cintra, UR-10 Ibura, Recife - PE, 51302-040, Brazil",
      placeId:
        "5151e85d76787941c059bb3efd774c4420c0f00102f9017f7551190000000092031253757065726d65726361646f20547265766f",
      distance: 4218.05,
    },
    {
      id: "ca4605ee-6722-46fe-9ab2-b67604dbcab4",
      name: "Atacadão",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51030-840",
      district: "Recife",
      neighbourhood: null,
      suburb: "Imbiribeira",
      street: "Rua Francisco Correia de Morais",
      longitude: -34.91107291736893,
      latitude: -8.12406905,
      address:
        "Atacadão, Rua Francisco Correia de Morais 100, Imbiribeira, Recife - PE, 51030-840, Brazil",
      placeId:
        "51bf96e6fd9e7441c059cae320a48f3f20c0f00102f90162ad700e00000000920309417461636164c3a36f",
      distance: 4397.98,
    },
    {
      id: "e10f486e-3d7b-4524-a88a-3baab5c20506",
      name: "BIG Bompreço",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "51020-280",
      district: "Recife",
      neighbourhood: null,
      suburb: "Boa Viagem",
      street: "Rua Padre Carapuceiro",
      longitude: -34.90226566791701,
      latitude: -8.1154241,
      address:
        "BIG Bompreço, Rua Padre Carapuceiro 800, Boa Viagem, Recife - PE, 51020-280, Brazil",
      placeId:
        "5181262f637d7341c059736bb2af173b20c0f00102f9019fbbcd070000000092030d42494720426f6d707265c3a76f",
      distance: 4632.06,
    },
    {
      id: "1b6f89e6-d764-4dde-9db9-ec0507a89817",
      name: "Supermercado Atacarejo",
      country: "Brazil",
      region: "Northeast Region",
      state: "Pernambuco",
      stateCode: "PE",
      city: "Recife",
      municipality: "Região Geográfica Imediata do Recife",
      postcode: "50761-000",
      district: "Recife",
      neighbourhood: null,
      suburb: "Cordeiro",
      street: "Avenida General San Martin",
      longitude: -34.92440538256798,
      latitude: -8.055634,
      address:
        "Supermercado Atacarejo, Avenida General San Martin 680, Cordeiro, Recife - PE, 50761-000, Brazil",
      placeId:
        "511aa34be7527641c059d8ddbe477a1c20c0f00102f90185a484190000000092031653757065726d65726361646f20417461636172656a6f",
      distance: 4856.25,
    },
  ];

  const handleDistanceChange = (selectedDistance: (typeof DISTANCES)[0]) => {
    setDistance(selectedDistance);
  };

  const renderItem = ({ item }: { item: Supermarket }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.distanceIconContainer}>
        <Icon name="map-marker-distance" size={20} color="#000" />
        <Text style={styles.distance}>
          {(item.distance / 1000).toFixed(2)}km
        </Text>
      </View>
      <Text style={styles.address}>{item.address}</Text>
    </View>
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Pesquisar supermercados"
        />
        <TouchableOpacity style={styles.searchButton}>
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
      <FlatList
        data={supermarkets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "10%",
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
});

export default SupermarketListScreen;
