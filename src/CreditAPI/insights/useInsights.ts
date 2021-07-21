import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { CreditDisplayToken } from "../types";
import LevelCreditAPI from "@levelcredit/js-lib-api";
import { InsightsObject } from "@levelcredit/js-lib-api/Credit/Insights/types";

type FetchUserInsights = (credit_display_token: CreditDisplayToken) => Promise<InsightsObject>;

export default function useInsights(): FetchUserInsights {
  const settings = useLevelCredit();

  const fetchScores: FetchUserInsights = useCallback(
    async function (credit_display_token: CreditDisplayToken) {
      if (!credit_display_token) {
        throw new Error("missing display_token");
      }

      const res = await LevelCreditAPI.Credit.Insights(settings, { display_token: credit_display_token });

      return await res.json();
    },
    [settings]
  );

  return fetchScores;
}
