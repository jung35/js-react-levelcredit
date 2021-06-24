import { ScoreAPIScores } from "../../useScoreAPI";

export default function getCurrentScore(score: ScoreAPIScores | null): number | null {
  return score ? score.current_score : null;
}
