import React, { useEffect, useState } from "react";
import { ScoreAPIDisplayToken, ScoreAPIScores, useScoreAPI } from "../useScoreAPI";
import UpSvg from "./assets/up.svg";
import DownSvg from "./assets/down.svg";
import TUSvg from "./assets/tu.svg";

export const SimpleScoreDisplayStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
};

export const SimpleScoreDataStyles = {
  display: "flex",
  alignItems: "flex-end",
};

export const SimpleScoreNumberStyles = {
  lineHeight: 0.9,
  color: "#000",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 36,
};

export const SimpleScoreTextStyles = {
  color: "#666",
  fontSize: 18,
  marginLeft: 10,
};

export const SimpleScoreDifferenceStyles = {
  display: "flex",
  alignItems: "flex-end",
  "& img": { width: "auto", height: 16 },
  "& span": { whiteSpace: "nowrap", lineHeight: 0.9, fontSize: 18, marginLeft: 5 },
  "&.positive": { color: "#21cc6f" },
  "&.negative": { color: "#ec654d", "& svg": { marginTop: -2 } },
};

export const SimpleScoreProvidedStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  margin: "15px 0 0",
  "& .tu": {
    display: "flex",
    alignItems: "center",
    "& img": { width: 24, height: "auto" },
    "& span": { margin: "2px 0 0 5px", fontSize: 16, color: "#d8d8d8", fontWeight: 500 },
  },
};

type SimpleScoreDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes?: any;
  display_token: ScoreAPIDisplayToken;
};

type ScoreRules = { score: number; symbol: string; text: string };

const score_rules: ScoreRules[] = [
  { score: -1, symbol: "over", text: "Off the charts" },
  { score: 850, symbol: "excellent", text: "Excellent" },
  { score: 780, symbol: "very_good", text: "Very good" },
  { score: 660, symbol: "good", text: "Good" },
  { score: 600, symbol: "fair", text: "Fair" },
  { score: 500, symbol: "bad", text: "Bad" },
];

export default function SimpleScoreDisplay(props: SimpleScoreDisplayProps): JSX.Element {
  const display_token = props.display_token;
  const classes = props.classes;

  const fetchScores = useScoreAPI();
  const [scores, setScores] = useState<ScoreAPIScores | null>(null);

  const credit_score = getCurrentScore(scores);
  const credit_score_rating = getCurrentScoreRating(scores);
  const { diff, last_updated } = getChangeSinceLastScore(scores);

  useEffect(
    function () {
      (async function () {
        const scores = await fetchScores(display_token);

        setScores(scores);
      })();
    },
    [fetchScores, display_token]
  );

  let last_updated_day = -1;

  if (last_updated) {
    const updated_date = +new Date(last_updated);
    const today = +new Date();

    const time_diff = today - updated_date;
    const days_diff = Math.ceil(time_diff / (24 * 3600 * 1000));
    last_updated_day = days_diff;
  }

  return (
    <div className={classes.SimpleScoreDisplay}>
      <div className={classes.SimpleScoreData}>
        <div className={classes.SimpleScoreNumber}>{credit_score}</div>
        <div className={classes.SimpleScoreText}>{credit_score_rating}</div>
      </div>

      {diff !== 0 && (
        <div className={`${classes.SimpleScoreDifference}${diff > 0 ? " positive" : diff < 0 ? " negative" : ""}`}>
          <img src={diff > 0 ? UpSvg : DownSvg} />
          <span>
            {diff} {diff === 1 || diff === -1 ? "pt" : "pts"}
          </span>
        </div>
      )}

      <div className={classes.SimpleScoreProvided}>
        <div className="tu">
          <img src={TUSvg} />
          <span>VantageScore 3.0</span>
        </div>
        {last_updated_day >= 0 && <div>{last_updated_day === 0 ? "Today" : `${last_updated_day}d ago`}</div>}
      </div>
    </div>
  );
}

function getCurrentScore(score: ScoreAPIScores | null) {
  return score ? score.current_score : null;
}

function getCurrentScoreRating(scores: ScoreAPIScores | null) {
  let matching_rule = null;
  const current_score = getCurrentScore(scores);

  for (let i = 1; i < score_rules.length; i++) {
    const score_rule = score_rules[i];

    if (
      current_score &&
      current_score <= score_rule.score &&
      (!matching_rule || matching_rule.score >= score_rule.score)
    ) {
      matching_rule = score_rule;
    }
  }

  if (!matching_rule && current_score) {
    matching_rule = score_rules[0];
  }

  return (matching_rule && matching_rule.text) || null;
}

function getChangeSinceLastScore(scores: ScoreAPIScores | null): { diff: number; last_updated?: string } {
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
