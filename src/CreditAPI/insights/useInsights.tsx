import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { CreditDisplayToken } from "../types";
import LevelCreditAPI from "@levelcredit/js-lib-api";
import { InsightsObject } from "@levelcredit/js-lib-api/Credit/Insights/types";
import useLevelCredit from "src/useLevelCredit";
import { APILoadingStatusRef } from "src/types";

type FetchUserInsights = (credit_display_token: CreditDisplayToken) => Promise<null | InsightsObject>;

export type InsightsHook = [insights: InsightsObject | null, fetch: FetchUserInsights];

const InsightsContext = createContext<InsightsHook>([
  null,
  function () {
    throw new Error("Missing <InsightsProvider />");
  },
]);

export function InsightsProvider(props: { children?: JSX.Element }): JSX.Element {
  const settings = useLevelCredit();

  const [insights, setInsights] = useState<InsightsObject | null>(null);
  const status = useRef<APILoadingStatusRef<InsightsObject>>({ promise: null, loading: false, pending: true });
  const [display_token, setDisplayToken] = useState<CreditDisplayToken | null>(null);

  const fetch: FetchUserInsights = useCallback(
    async function (credit_display_token?: CreditDisplayToken) {
      if (!credit_display_token && !display_token) {
        throw new Error("missing display_token");
      }

      const already_loading = Boolean(status.current.loading && status.current.promise);

      // race condition check
      if (already_loading) {
        return await status.current.promise;
      }

      if (credit_display_token) {
        setDisplayToken(() => credit_display_token);
      }

      const promise_data = LevelCreditAPI.Credit.Insights(settings, {
        display_token: (credit_display_token || display_token) as CreditDisplayToken,
      }).then((res) => res.json());

      status.current = { promise: promise_data, loading: true, pending: false };

      try {
        const insights: InsightsObject = await promise_data;

        status.current = { promise: null, loading: false, pending: false };
        setInsights(() => insights);

        return insights;
      } catch (error) {
        status.current = { promise: null, loading: false, pending: false };
        setInsights(() => null);
        throw error;
      }
    },
    [display_token, settings]
  );

  React.useEffect(
    function () {
      return () => {
        setInsights(null);
        status.current = { promise: null, loading: false, pending: true };
      };
    },
    [display_token]
  );

  return <InsightsContext.Provider value={[insights, fetch]}>{props.children}</InsightsContext.Provider>;
}

export default function useInsights(credit_display_token?: CreditDisplayToken): InsightsHook {
  const [insights, fetch] = useContext(InsightsContext);

  React.useEffect(
    function () {
      if (credit_display_token) {
        fetch(credit_display_token).catch(() => null);
      }
    },
    [credit_display_token, fetch]
  );

  return [insights, fetch];
}
