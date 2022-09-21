

export const setLoading: any = (isLoading: boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: 'SET_LOADING',
            loading: isLoading
        })
    }
}