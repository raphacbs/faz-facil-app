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

export const fetchSupermarkets = async (
  pageParam: number,
  latitude: number,
  longitude: number,
  name?: string
) => {
  const url = `${endPoint}?pageNo=${pageParam}&pageSize=10&sortBy=name&sortDir=asc&latitude=${latitude}&longitude=${longitude}&radiusM=5000${
    name ? "&name=" + name : ""
  }`;
  let { data } = await api.get(url);
  data.items = data.items.sort(compare);
  return data;
};
