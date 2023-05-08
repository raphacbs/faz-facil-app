export type UserInfo = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verifiedEmail: boolean;
  tokenDto: {
    token: string;
    message: string;
    expiredAt: string;
  };
};

export interface InitialState {
  userInfoLogged: UserInfo;
}
