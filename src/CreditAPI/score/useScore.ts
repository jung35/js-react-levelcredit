import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { CreditDisplayToken } from "../types";
import LevelCreditAPI from "@levelcredit/js-lib-api";
import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

type FetchUserScores = (credit_display_token: CreditDisplayToken) => Promise<ScoreObject>;

export default function useScores(): FetchUserScores {
  const settings = useLevelCredit();

  const fetchScores: FetchUserScores = useCallback(
    async function (credit_display_token: CreditDisplayToken) {
      if (!credit_display_token) {
        throw new Error("missing display_token");
      }

      const res = await LevelCreditAPI.Credit.Score(settings, { display_token: credit_display_token });

      return await res.json();
    },
    [settings]
  );

  return fetchScores;
}
