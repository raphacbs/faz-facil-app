import { InitialState } from "../../types/PriceHistories";

const initialState: InitialState = {
  priceHistoryToSave: {
    price: 0,
    product: {
      code: "",
    },
    supermarket: {
      id: "",
    },
  },
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_PRICE_HISTORY_TO_SAVE":
      return { ...state, priceHistoryToSave: action.payload };
    default:
      return state;
  }
};

export default reducer;
