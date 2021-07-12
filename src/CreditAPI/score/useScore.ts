import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { CreditAPIError, CreditDisplayToken } from "../types";

type FetchUserScores = (score_display_token: CreditDisplayToken) => Promise<ScoresObj>;

export type ScoresObj = {
  current_score: number;
  change_since_first: number;
  scores: ScoresObjScores;
  next_update: string;
  messages: Array<CreditAPIError>;
};

export type ScoresObjScores = {
  [key: string]: string;
};

export default function useScores(): FetchUserScores {
  const { api_url } = useLevelCredit();

  const fetchScores: FetchUserScores = useCallback(
    async function (score_display_token: CreditDisplayToken) {
      if (!score_display_token) {
        throw new Error("missing display_token");
      }

      const res = await window.fetch(`${api_url}/api/credit/scores/${score_display_token}`);

      return res.json();
    },
    [api_url]
  );

  return fetchScores;
}
