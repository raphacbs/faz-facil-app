import { useQuery } from "react-query";
import api from "@/services/api";

export const useProductsQuery = (name: string) => {
  return useQuery(["products", name], async () => {
    const response = await api.get(`/products?description=${name}`);
    return response.data;
  });
};
