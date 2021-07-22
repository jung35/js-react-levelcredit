import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

export default function getChangeSinceLastScore(scores: ScoreObject | null): { diff: number; last_updated?: string } {
  if (!scores?.scores) {
    return { diff: 0, last_updated: undefined };
  }

  const dates = Object.keys(scores.scores);

  if (dates.length <= 1) {
    return { diff: 0, last_updated: dates.length === 1 ? dates[0] : undefined };
  }

  const recent_score = parseInt(scores.scores[dates[0]]);
  const previous_score = parseInt(scores.scores[dates[1]]);

  return { diff: recent_score - previous_score, last_updated: dates[0] };
}
