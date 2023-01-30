import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { IParamsSupermarket } from "../@types/supermarket";
import api from "../services/api";

const endPoint = "/api/v1/supermarkets";

function compare(a: any, b: any) {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
}

export const fetchSupermarkets = async (params: IParamsSupermarket) => {
  const url = `${endPoint}?pageNo=1&pageSize=10&sortBy=name&sortDir=asc&latitude=${params.latitude}&longitude=${params.longitude}&radiusM=5000`;
  const { data } = await api.get(url);
  return data.items.sort(compare);
};
