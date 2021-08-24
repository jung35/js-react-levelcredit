import React, { useMemo } from "react";
import { APIAuthType, APIFetchSettings, EnvType } from "@levelcredit/js-lib-api/types";
import { ScoreProvider } from "./CreditAPI/score/useScore";
import { InsightsProvider } from "./CreditAPI/insights/useInsights";
import { LevelCreditContext } from "./useLevelCredit";

export type LevelCreditProviderProps = {
  env?: EnvType;
  api_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

type OptionalLevelCreditSettings = {
  env?: EnvType;
  base_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

export default function LevelCreditProvider(props: LevelCreditProviderProps & { children?: JSX.Element }): JSX.Element {
  const { children, env, api_url, auth_token, auth_type } = props;

  const settings = useMemo(
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

  return (
    <LevelCreditContext.Provider value={settings}>
      <ScoreProvider>
        <InsightsProvider>{children}</InsightsProvider>
      </ScoreProvider>
    </LevelCreditContext.Provider>
  );
}
