export interface ShoppingList {
    id: string;
    description: string;
    supermarket: string;
    createAt: string;
    updateAt: string;
    amount: string;
    amountProducts: number;
    archived: boolean
    amountCheckedProducts: number
}

export interface CartItem {
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
    unitValue: string,
    amountOfProduct: number,
    subtotal: string,
    createdAt: string,
    isChecked: boolean
}

export interface ShoppingCartType {
    cartItems: Array<CartItem>,
    totalCartItems: number,
    totalProducts: number,
    amountItems: string,
    subtotalChecked: string,
    totalProductsChecked: number,
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
