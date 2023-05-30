import useConstants from "../../hooks/useConstants";
import { InitialState } from "../../types/Unit";

export const initialState: InitialState = {
  units: [],
};

const { SET_UNITS } = useConstants();

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case SET_UNITS:
      return { ...state, units: action.payload };

    default:
      return state;
  }
};

export default reducer;
