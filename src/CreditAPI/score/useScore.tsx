import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import useLevelCredit from "src/useLevelCredit";
import { CreditDisplayToken } from "../types";
import LevelCreditAPI from "@levelcredit/js-lib-api";
import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";
import { APILoadingStatusRef } from "src/types";

type FetchUserScores = (credit_display_token: CreditDisplayToken) => Promise<null | ScoreObject>;

export type ScoreHook = [score: ScoreObject | null, fetch: FetchUserScores];

const ScoreContext = createContext<ScoreHook>([
  null,
  function () {
    throw new Error("Missing <ScoreProvider />");
  },
]);

export function ScoreProvider(props: { children?: JSX.Element }): JSX.Element {
  const settings = useLevelCredit();

  const [scores, setScore] = useState<ScoreObject | null>(null);
  const status = useRef<APILoadingStatusRef<ScoreObject>>({ promise: null, loading: false, pending: true });
  const [display_token, setDisplayToken] = useState<CreditDisplayToken | null>(null);

  const fetch: FetchUserScores = useCallback(
    async function (credit_display_token?: CreditDisplayToken) {
      if (!credit_display_token && !display_token) {
        throw new Error("missing display_token");
      }

      const already_loading = status.current.loading && status.current.promise;

      // race condition check
      if (already_loading) {
        return await status.current.promise;
      }

      if (credit_display_token) {
        setDisplayToken(() => credit_display_token);
      }

      const promise_data = LevelCreditAPI.Credit.Score(settings, {
        display_token: (credit_display_token || display_token) as CreditDisplayToken,
      }).then((res) => res.json());

      status.current = { promise: promise_data, loading: true, pending: false };

      try {
        const score: ScoreObject = await promise_data;

        status.current = { promise: null, loading: false, pending: false };
        setScore(() => score);

        return score;
      } catch (error) {
        status.current = { promise: null, loading: false, pending: false };
        setScore(() => null);
        throw error;
      }
    },
    [display_token, settings]
  );

  React.useEffect(
    function () {
      return () => {
        setScore(null);
        status.current = { promise: null, loading: false, pending: true };
      };
    },
    [display_token]
  );

  return <ScoreContext.Provider value={[scores, fetch]}>{props.children}</ScoreContext.Provider>;
}

export default function useScores(credit_display_token?: CreditDisplayToken): ScoreHook {
  const [scores, fetch] = useContext(ScoreContext);

  React.useEffect(
    function () {
      if (credit_display_token) {
        fetch(credit_display_token).catch(() => null);
      }
    },
    [credit_display_token, fetch]
  );

  return [scores, fetch];
}
