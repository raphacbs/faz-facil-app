import { InitialState, Supermarket } from "../../types/Supermarket";

const initialState: InitialState = {
  supermarketSelected: {
    id: "",
    name: "",
    country: "",
    region: "",
    state: "",
    stateCode: "",
    city: "",
    municipality: "",
    postcode: "",
    district: "",
    neighbourhood: null,
    suburb: "",
    street: "",
    longitude: 0,
    latitude: 0,
    address: "",
    placeId: "",
    distance: 0,
  },
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SUPERMARKET_SELECTED":
      return { ...state, supermarketSelected: action.payload };
    default:
      return state;
  }
};

export default reducer;
