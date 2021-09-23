import LevelCreditAPI from "@levelcredit/js-lib-api";
import { AlertSimple, AlertDetailed } from "@levelcredit/js-lib-api/Protection/types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useLevelCredit from "src/useLevelCredit";

type FetchMonitoringAlerts = (alert_id?: number) => Promise<AlertSimple[] | AlertDetailed>;
type DismissMonitoringAlert = (alert_id: number) => Promise<void>;
type MonitoringAlertHook = [
  alerts: null | AlertSimple[],
  fetch: FetchMonitoringAlerts,
  dismiss: DismissMonitoringAlert
];

const MonitoringAlertContext = createContext<MonitoringAlertHook>([
  null,
  function () {
    throw new Error("Missing <MonitoringAlertProvider />");
  },
  function () {
    throw new Error("Missing <MonitoringAlertProvider />");
  },
]);

export function MonitoringAlertProvider(props: { children?: JSX.Element }): JSX.Element {
  const settings = useLevelCredit();
  const [alerts, setAlerts] = useState<null | AlertSimple[]>(null);

  const fetch = useCallback(
    async function (alert_id?: number) {
      if (alert_id && typeof alert_id === "number") {
        const res = await LevelCreditAPI.Protection.Monitoring.Alerts(settings, { id: alert_id });

        return (await res.json()) as AlertDetailed;
      }

      const res = await LevelCreditAPI.Protection.Monitoring.Alerts(settings, null);
      const alerts = ((await res.json()) || []) as AlertSimple[];

      setAlerts(() => alerts);

      return alerts;
    },
    [settings]
  );

  const dismiss = useCallback(
    async function (alert_id: number) {
      await LevelCreditAPI.Protection.Monitoring.Alerts(settings, { id: alert_id, dismiss: true });
    },
    [settings]
  );

  return (
    <MonitoringAlertContext.Provider value={[alerts, fetch, dismiss]}>{props.children}</MonitoringAlertContext.Provider>
  );
}

export default function useMonitoringAlerts(): MonitoringAlertHook {
  const [alerts, fetch, dismiss] = useContext(MonitoringAlertContext);

  useEffect(
    function () {
      if (!alerts) {
        fetch().catch(() => null);
      }
    },
    [alerts, fetch]
  );

  return [alerts, fetch, dismiss];
}
