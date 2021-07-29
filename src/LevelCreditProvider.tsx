import React, { createContext, useContext } from "react";
import { APIAuthType, APIFetchSettings } from "@levelcredit/js-lib-api/types";

type LevelCreditEnv = "development" | "sandbox" | "production";

export type LevelCreditProviderProps = {
  env?: LevelCreditEnv;
  api_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

type OptionalLevelCreditSettings = {
  env?: LevelCreditEnv;
  base_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

const LevelCreditContext = createContext<LevelCreditProviderProps>({});

export default function LevelCreditProvider(props: LevelCreditProviderProps & { children?: JSX.Element }): JSX.Element {
  const { children, ...rest } = props;

  return <LevelCreditContext.Provider value={rest}>{children}</LevelCreditContext.Provider>;
}

export function useLevelCredit(): APIFetchSettings {
  const { env, api_url, auth_token, auth_type } = useContext(LevelCreditContext);

  if (!env && !api_url) {
    throw new Error("Missing LevelCredit Provider configuration");
  }

  const settings = React.useMemo(
    function () {
      const temp_settings: OptionalLevelCreditSettings = {};

      if (api_url) {
        temp_settings.base_url = api_url;
      } else if (env) {
        temp_settings.env = env;
      }

      if (auth_token) {
        temp_settings.auth_token = auth_token;
        temp_settings.auth_type = auth_type || "header";
      } else {
        temp_settings.auth_type = "none";
      }

      return temp_settings as APIFetchSettings;
    },
    [api_url, auth_token, auth_type, env]
  );

  return settings;
}
