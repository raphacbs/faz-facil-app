export interface Supermarket {
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
  neighbourhood?: null;
  suburb: string;
  street: string;
  longitude: number;
  latitude: number;
  address: string;
  placeId: string;
}
