import { useEffect, useState } from "react";
import Constants from "expo-constants";

interface Env {
  apiUrl: string;
  appVersion: string | null | undefined;
}

export function useEnv(): Env {
  const [env, setEnv] = useState<Env>({
    apiUrl: "",
    appVersion: "",
  });

  useEffect(() => {
    const getEnvVars = async () => {
      const apiUrl = Constants.manifest?.extra?.apiUrl;
      const appVersion = Constants.manifest?.version;

      setEnv({
        apiUrl,
        appVersion,
      });
    };

    getEnvVars();
  }, []);

  return env;
}

export function useApiUrl() {
  const { apiUrl } = useEnv();
  return apiUrl;
}

export function useAppVersion() {
  const { appVersion } = useEnv();
  return appVersion;
}
