import { useCallback } from "react";
import { useLevelCredit } from "../LevelCreditProvider";

type ScoreAPIFetchScores = (score_display_token: string) => Promise<ScoreAPIScores>;

export type ScoreAPIScores = {
  current_score: number;
  change_since_first: number;
  scores: ScoreAPIScoresScores;
  next_update: string;
  messages: Array<ScoreAPIScoresError>;
};

export type ScoreAPIScoresScores = { [key: string]: string };
type ScoreAPIScoresError = { code: number; message: string; priority: ScoreAPIScoresErrorPriority };
type ScoreAPIScoresErrorPriority = "high" | "medium" | "low";

export function useScoreAPI(): ScoreAPIFetchScores {
  const { api_url } = useLevelCredit();

  const fetchScores: ScoreAPIFetchScores = useCallback(
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
