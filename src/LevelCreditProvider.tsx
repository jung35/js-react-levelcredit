import { APIFetchSettings } from "@levelcredit/js-lib-api/types";
import React, { useMemo } from "react";
import { InsightsProvider } from "./CreditAPI/insights/useInsights";
import { ScoreProvider } from "./CreditAPI/score/useScore";
import { LevelCreditProviderProps } from "./types";
import { LevelCreditContext } from "./useLevelCredit";

export default function LevelCreditProvider(props: LevelCreditProviderProps & { children?: JSX.Element }): JSX.Element {
  const { children, env, api_url } = props;

  const settings = useMemo(
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

  return (
    <LevelCreditContext.Provider value={settings}>
      <ScoreProvider>
        <InsightsProvider>{children}</InsightsProvider>
      </ScoreProvider>
    </LevelCreditContext.Provider>
  );
}
