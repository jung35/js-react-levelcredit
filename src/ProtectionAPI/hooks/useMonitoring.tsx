import LevelCreditAPI from "@levelcredit/js-lib-api";
import { MonitoringObject } from "@levelcredit/js-lib-api/Protection/types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useLevelCredit from "src/useLevelCredit";

type FetchMonitoring = () => Promise<null | MonitoringObject>;
type MonitoringHook = [monitoring: null | MonitoringObject, fetch: FetchMonitoring];

const MonitoringContext = createContext<MonitoringHook>([
  null,
  function () {
    throw new Error("Missing <MonitoringProvider />");
  },
]);

export function MonitoringProvider(props: { children?: JSX.Element }): JSX.Element {
  const settings = useLevelCredit();
  const [monitoring, setMonitoring] = useState<null | MonitoringObject>(null);

  const fetch = useCallback(
    async function () {
      const res = await LevelCreditAPI.Protection.Monitoring.Monitoring(settings, null);
      const monitoring = (await res.json()) as MonitoringObject;

      setMonitoring(() => monitoring);

      return monitoring;
    },
    [settings]
  );

  return <MonitoringContext.Provider value={[monitoring, fetch]}>{props.children}</MonitoringContext.Provider>;
}

export default function useMonitoring(): MonitoringHook {
  const [alerts, fetch] = useContext(MonitoringContext);

  useEffect(
    function () {
      if (!alerts) {
        fetch().catch(() => null);
      }
    },
    [alerts, fetch]
  );

  return [alerts, fetch];
}
