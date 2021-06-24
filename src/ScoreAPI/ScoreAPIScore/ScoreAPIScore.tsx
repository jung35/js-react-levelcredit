import React from "react";
import injectSheet, { Styles } from "react-jss";
import { ScoreAPIDisplayToken, ScoreAPIScores } from "../useScoreAPI";
import SimpleScoreDisplay, { styles as SimpleScoreDisplayStyles } from "./SimpleScoreDisplay";
import CircularScoreDisplay, { styles as CircularScoreDisplayStyles } from "./CircularScoreDisplay";

type ScoreAPIScoreDisplayStyle = "simple" | "pie";
type ScoreAPIScoreStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes?: any;
};

type ScoreAPIScoreProps = ScoreAPIScoreStyles & {
  display_token: ScoreAPIDisplayToken;
  dataDisplayStyle?: ScoreAPIScoreDisplayStyle;
};

export type ScoreAPIScoreStylesFunc = (props: ScoreAPIScoreStyles) => React.CSSProperties;

const styles: unknown = {
  ...SimpleScoreDisplayStyles,
  ...CircularScoreDisplayStyles,
};

type ScoreRules = { score: number; symbol: string; text: string; color: string };

export const SCORE_RULES: ScoreRules[] = [
  { score: -1, symbol: "over", text: "Off the charts", color: "#c5c5c5" },
  { score: 850, symbol: "excellent", text: "Excellent", color: "#0f9246" },
  { score: 780, symbol: "very_good", text: "Very good", color: "#7dbb42" },
  { score: 660, symbol: "good", text: "Good", color: "#ffd226" },
  { score: 600, symbol: "fair", text: "Fair", color: "#f68e1f" },
  { score: 500, symbol: "bad", text: "Bad", color: "#bc2026" },
];

function ScoreAPIScore(props: ScoreAPIScoreProps): JSX.Element {
  const classes = props.classes;
  const display_style = props.dataDisplayStyle || "simple";
  const display_token = props.display_token;

  if (display_style === "simple") {
    return <SimpleScoreDisplay classes={classes} display_token={display_token} />;
  }

  if (display_style === "pie") {
    return <CircularScoreDisplay classes={classes} display_token={display_token} />;
  }

  return <div className={classes.root}></div>;
}

const fallbackHOC = injectSheet(styles as Styles)(ScoreAPIScore);

export { fallbackHOC as ScoreAPIScore };

export function getCurrentScore(score: ScoreAPIScores | null): number | null {
  return score ? score.current_score : null;
}

export function getScoreRule(score: number | null): ScoreRules | null {
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

export function getChangeSinceLastScore(scores: ScoreAPIScores | null): { diff: number; last_updated?: string } {
  if (!scores) {
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

export function parseLastUpdatedDay(last_updated: Date): number {
  const updated_date = +last_updated;
  const today = +new Date();

  const time_diff = today - updated_date;
  const days_diff = Math.ceil(time_diff / (24 * 3600 * 1000));

  return days_diff;
}
