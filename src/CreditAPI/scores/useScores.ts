import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";

export type ScoreDisplayToken = string;
type FetchUserScores = (score_display_token: ScoreDisplayToken) => Promise<ScoresObj>;

export type ScoresObj = {
  current_score: number;
  change_since_first: number;
  scores: ScoresObjScores;
  next_update: string;
  messages: Array<ScoresObjError>;
};

export type ScoresObjScores = { [key: string]: string };
type ScoresObjError = { code: number; message: string; priority: ScoresObjErrorPriority };
type ScoresObjErrorPriority = "high" | "medium" | "low";

export default function useScores(): FetchUserScores {
  const { api_url } = useLevelCredit();

  const fetchScores: FetchUserScores = useCallback(
    async function (score_display_token) {
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
