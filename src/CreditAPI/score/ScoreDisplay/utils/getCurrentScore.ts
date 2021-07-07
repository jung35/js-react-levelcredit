import { ScoresObj } from "src/CreditAPI/score/useScore";

export default function getCurrentScore(score: ScoresObj | null): number | null {
  return score ? score.current_score : null;
}
