import { useMemo } from "react";

const useConstants = () => {
  const USER_LOGGER = "USER_LOGGER";

  const SET_USER_INFO_LOGGED = "SET_USER_INFO_LOGGED";

  return {
    USER_LOGGER,
    SET_USER_INFO_LOGGED,
  };
};

export default useConstants;
