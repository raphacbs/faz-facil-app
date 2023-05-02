import { PriceHistory, PriceHistoryPost } from "../../types/PriceHistories";
import api from "../../services/api";

const endPoint = "/api/v1/price-histories";

export const setPriceHistoryToSave: any = (priceHistory: PriceHistoryPost) => {
  return async (dispatch: any) => {
    try {
      // faça as operações necessárias aqui
      await dispatch({
        type: "SET_PRICE_HISTORY_TO_SAVE",
        payload: priceHistory,
      });
    } catch (error) {
      // trate o erro aqui
      console.error(error);
    }
  };
};
// {
// return (dispatch: any) => {
//   console.log("SET_PRICE_HISTORY_TO_SAVE", priceHistory);
//   dispatch({
//     type: "SET_PRICE_HISTORY_TO_SAVE",
//     payload: priceHistory,
//   });
// };
// };

export const savePriceHistory = async (priceHistoryPost: PriceHistoryPost) => {
  console.log(priceHistoryPost);
  const { data } = await api.post(endPoint, priceHistoryPost);
  return data;
};
