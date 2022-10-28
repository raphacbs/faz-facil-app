export interface ShoppingListType {
    id: string;
    description: string;
    supermarket: any;
    createAt: string;
    updateAt: string;
    amount: string;
    amountProducts: number;
    archived: boolean
    amountCheckedProducts: number
}

export interface CartItemType {
    id: string,
    shoppingCartId: string,
    product: {
        id: string,
        description: string,
        brand: string,
        image: string,
        ean: string,
        createAt: string,
        updateAt: string,
    },
    price: string,
    amountOfProduct: number,
    subtotal: string,
    createdAt: string,
    isChecked: boolean
}

export interface ShoppingCartType {
    cartItems: Array<CartItemType>,
    totalCartItems: number,
    totalProducts: number,
    amountItems: string,
    subtotalChecked: string,
    totalProductsChecked: number

}


export interface ProductItemType {
    id: string,
    description: string,
    brand: string,
    image: string,
    ean: string,
    createAt: string,
    updateAt: string
}

export interface PageInfoType {
    pageNo: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
    last: boolean
}

export interface CartItemBodyType {
    productId: string,
    price: string,
    amountOfProduct: number,
    isChecked: boolean,
}

export interface PriceHistoryType {
    id: string,
    productId: string,
    supermarketId: string,
    price: string,
    date: string
}