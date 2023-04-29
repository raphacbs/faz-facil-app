import { PriceHistory, PriceHistoryPost } from "../../types/PriceHistories";
import api from "../../services/api";

const endPoint = "/api/v1/price-histories";

export const setPriceHistoryToSave: any = async (
  priceHistory: PriceHistoryPost
) => {
  return async (dispatch: any) => {
    try {
      const response = await api.post("/api/v1/price-histories", priceHistory);
      // dispatch({ type: SET_LOADING_PRICE, payload: true });
    } catch (error) {
      console.log("Failed to save price history:", error);
      throw error;
    }
  };
};

export const addPriceHistory = async (priceHistoryPost: PriceHistoryPost) => {
  const { data } = await api.post(endPoint, priceHistoryPost);
  return data;
};
