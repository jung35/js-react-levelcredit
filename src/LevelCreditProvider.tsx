import React, { useMemo } from "react";
import { APIFetchSettings } from "@levelcredit/js-lib-api/types";
import { ScoreProvider } from "./CreditAPI/score/useScore";
import { InsightsProvider } from "./CreditAPI/insights/useInsights";
import { LevelCreditContext } from "./useLevelCredit";
import { LevelCreditProviderProps, OptionalLevelCreditSettings } from "./types";
import { MonitoringAlertProvider } from "./ProtectionAPI/hooks/useMonitoringAlerts";
import { MonitoringProvider } from "./ProtectionAPI/hooks/useMonitoring";

export default function LevelCreditProvider(props: LevelCreditProviderProps & { children?: JSX.Element }): JSX.Element {
  const { children, env, api_url, base_url, auth_token, auth_type } = props;

  const settings = useMemo(
    function () {
      const temp_settings: OptionalLevelCreditSettings = {};

      if (api_url || base_url) {
        temp_settings.base_url = base_url || api_url;
      } else if (env) {
        temp_settings.env = env;
      }

      if (auth_token) {
        temp_settings.auth_token = auth_token;
        temp_settings.auth_type = auth_type || "header";
      } else if (auth_type === "cookie") {
        // cookie auth type doesn't have any token passed'
        temp_settings.auth_type = auth_type;
      } else {
        temp_settings.auth_type = "none";
      }

      return temp_settings as APIFetchSettings;
    },
    [api_url, auth_token, auth_type, base_url, env]
  );

  return (
    <LevelCreditContext.Provider value={settings}>
      <ScoreProvider>
        <InsightsProvider>
          <MonitoringProvider>
            <MonitoringAlertProvider>{children}</MonitoringAlertProvider>
          </MonitoringProvider>
        </InsightsProvider>
      </ScoreProvider>
    </LevelCreditContext.Provider>
  );
}
