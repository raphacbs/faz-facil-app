export interface ISupermarket {
  id: string;
  name: string;
  country: string;
  region: string;
  state: string;
  stateCode: string;
  city: string;
  municipality: string;
  postcode: string;
  district: string;
  neighbourhood: string;
  suburb: string;
  street: string;
  longitude: number;
  latitude: number;
  address: string;
  placeId: string;
  distance: number;
}
export type SupermarketContextType = {
  supermarkets: ISupermarket[];
  supermarket: ISupermarket | null;
  params: IParamsSupermarket;
  pageInfo: IPageInfo;
  loading: boolean;
  error: any | null;
  updateSupermarket: (_supermarket: ISupermarket | null) => void;
  resetSupermarkets: () => void;
  resetParams: () => void;
  get: (_params: IParams, _supermarkets: ISupermarket[] | null = null) => void;
  getById: (id: string) => void;
};

export interface IParamsSupermarket {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  radiusM: string;
  longitude: number;
  latitude: number;
  name?: string;
}
