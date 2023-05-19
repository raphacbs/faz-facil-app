import { Env } from "../Env";
import axios from "axios";

export async function authGoogle(token: string) {
  try {
    let userInfoResponse = await axios(
      `${Env.API_AUTH_BASE_URL}api/v1/user/login/google`,
      {
        headers: { token: token },
        method: "GET",
      }
    );

    console.log("userGoogle", userInfoResponse.data);
    return userInfoResponse.data;
  } catch (error) {
    console.error("Error to get user data in Google");
    console.error(JSON.stringify(error));
    throw Error("Error to get user data in Google");
  }
}

export async function authFacebook(token: string) {
  try {
    let userInfoResponse = await axios(
      `${Env.API_AUTH_BASE_URL}api/v1/user/login/facebook`,
      {
        headers: { token: token },
        method: "GET",
      }
    );

    console.log("userFacebook", userInfoResponse.data);
    return userInfoResponse.data;
  } catch (error) {
    console.error("Error to get user data in Facebook");
    console.error(JSON.stringify(error));
    throw Error("Error to get user data in Facebook");
  }
}
