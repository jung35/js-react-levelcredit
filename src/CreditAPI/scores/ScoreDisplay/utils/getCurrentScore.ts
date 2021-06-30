import { ScoresObj } from "src/CreditAPI/scores/useScores";

export default function getCurrentScore(score: ScoresObj | null): number | null {
  return score ? score.current_score : null;
}
