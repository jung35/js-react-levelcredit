import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

export default function getCurrentScore(score: ScoreObject | null): number | null {
  return score ? score.current_score : null;
}
