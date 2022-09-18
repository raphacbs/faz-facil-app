export interface ModelsInitialState {
    shoppingLists: Array<object>,
    shoppingList: {
        id: string;
        description: string;
        supermarket: string;
        createAt: string;
        updateAt: string;
        amount: string;
        amountProducts: number;
        archived: boolean
    }
    error: any,
    loading: boolean,
    showAlert: boolean
}

export interface ToastInterface {
    message: string,
    type?: "error" | "success" | "info" | "warning" | undefined;
}

export interface Alert {
    message: string,
    type: "error" | "success" | "info" | "warning" | undefined;

}