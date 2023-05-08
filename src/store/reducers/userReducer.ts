import { InitialState } from "../../types/UserInfo";

const initialState: InitialState = {
  userInfoLogged: {
    email: "",
    familyName: "",
    givenName: "",
    id: "",
    locale: "",
    name: "",
    picture: "",
    verifiedEmail: false,
    tokenDto: {
      token: "",
      message: "",
      expiredAt: "",
    },
  },
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_USER_INFO_LOGGED":
      return { ...state, userInfoLogged: action.payload };
    default:
      return state;
  }
};

export default reducer;
