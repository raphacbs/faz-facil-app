import axios from "axios";

export async function auth(token: string) {
  try {
    let userInfoResponse = await axios(
      "http://192.168.1.12:8085/api/v1/user/login/google",
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

export async function getUserData(accessToken: string) {
  try {
    let userInfoResponse = await axios(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }
    );
    console.log("userGoogle", userInfoResponse.data);
    return userInfoResponse.data;
  } catch {
    console.error("Error to get user data in Google");
    throw Error("Error to get user data in Google");
  }
}
