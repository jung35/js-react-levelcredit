type ScoreRules = { score: number; symbol: string; text: string; color: string };

export const SCORE_RULES: ScoreRules[] = [
  { score: -1, symbol: "over", text: "Off the charts", color: "#c5c5c5" },
  { score: 850, symbol: "excellent", text: "Excellent", color: "#0f9246" },
  { score: 780, symbol: "very_good", text: "Very good", color: "#7dbb42" },
  { score: 660, symbol: "good", text: "Good", color: "#ffd226" },
  { score: 600, symbol: "fair", text: "Fair", color: "#f68e1f" },
  { score: 500, symbol: "bad", text: "Bad", color: "#bc2026" },
];

export default function getScoreRule(score: number | null): ScoreRules | null {
  if (!score) {
    return null;
  }

  let matching_rule = null;

  for (let i = 1; i < SCORE_RULES.length; i++) {
    const score_rule = SCORE_RULES[i];

    if (score && score <= score_rule.score && (!matching_rule || matching_rule.score >= score_rule.score)) {
      matching_rule = score_rule;
    }
  }

  if (!matching_rule && score) {
    matching_rule = SCORE_RULES[0];
  }

  return matching_rule;
}
