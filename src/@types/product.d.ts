export interface IProduct {
  code: string;
  description: string;
  brand: string;
  thumbnail: string | null;
  createdAt: string;
  updateAt: string;
  unit: string | null;
  priceHistories: array;
}

export interface IProductPost {
  code?: string;
  description: string;
  brand: string;
}

export interface IProductPut {
  code: string;
  description: string;
  brand: string;
}
export type ProductContextType = {
  products: IProduct[];
  product: IProduct | null;
  params: IParamsProduct;
  pageInfo: IPageInfo;
  loading: boolean;
  error: any | null;
  _setProduct: (_product: IProduct | null) => void;
  resetProducts: () => void;
  resetParams: () => void;
  get: (_params: IParams, _supermarkets: ISupermarket[] | null = null) => void;
  getById: (id: string) => void;
  update: (_product: IProductPut) => void;
  add: (_product: IProductPost) => void;
};

export interface IParamsProduct {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  code?: string;
  description?: string;
}
