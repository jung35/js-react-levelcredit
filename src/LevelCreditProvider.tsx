import React, { createContext, useContext } from "react";
import { APIFetchSettings } from "@levelcredit/js-lib-api/types";

type LevelCreditEnv = "development" | "sandbox" | "production";

export type LevelCreditProviderProps = { env?: LevelCreditEnv; api_url?: string };

const LevelCreditContext = createContext<LevelCreditProviderProps>({});

export default function LevelCreditProvider(props: LevelCreditProviderProps & { children?: JSX.Element }): JSX.Element {
  const { children, ...rest } = props;

  return <LevelCreditContext.Provider value={rest}>{children}</LevelCreditContext.Provider>;
}

export function useLevelCredit(): APIFetchSettings {
  const { env, api_url } = useContext(LevelCreditContext);

  if (!env && !api_url) {
    throw new Error("Missing LevelCredit Provider configuration");
  }

  const settings = React.useMemo(
    function () {
      const temp_settings: { env?: string; base_url?: string } = {};
      if (api_url) {
        temp_settings.base_url = api_url;
      } else if (env) {
        temp_settings.env = env;
      }

      return temp_settings as APIFetchSettings;
    },
    [api_url, env]
  );

  return settings;
}
