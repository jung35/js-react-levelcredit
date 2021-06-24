import React, { useEffect, useState } from "react";
import { ScoreAPIDisplayToken, ScoreAPIScores, useScoreAPI } from "../useScoreAPI";
import UpSvg from "./assets/up.svg";
import DownSvg from "./assets/down.svg";
import TUSvg from "./assets/tu.svg";
import { getScoreRule, getCurrentScore, getChangeSinceLastScore, parseLastUpdatedDay } from "./ScoreAPIScore";

const SimpleScoreDisplayStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  flexWrap: "wrap",
};

const SimpleScoreDataStyles = {
  display: "flex",
  alignItems: "flex-end",
};

const SimpleScoreNumberStyles = {
  lineHeight: 0.9,
  color: "#000",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 36,
};

const SimpleScoreTextStyles = {
  color: "#666",
  fontSize: 18,
  marginLeft: 10,
};

const SimpleScoreDifferenceStyles = {
  display: "flex",
  alignItems: "flex-end",
  "& img": { width: "auto", height: 16 },
  "& span": { whiteSpace: "nowrap", lineHeight: 0.9, fontSize: 18, marginLeft: 5 },
  "&.positive": { color: "#21cc6f" },
  "&.negative": { color: "#ec654d", "& svg": { marginTop: -2 } },
};

const SimpleScoreProvidedStyles = {
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

export const styles = {
  SimpleScoreDisplay: SimpleScoreDisplayStyles,
  SimpleScoreData: SimpleScoreDataStyles,
  SimpleScoreNumber: SimpleScoreNumberStyles,
  SimpleScoreText: SimpleScoreTextStyles,
  SimpleScoreDifference: SimpleScoreDifferenceStyles,
  SimpleScoreProvided: SimpleScoreProvidedStyles,
};

export default function SimpleScoreDisplay(props: SimpleScoreDisplayProps): JSX.Element {
  const display_token = props.display_token;
  const classes = props.classes;

  const fetchScores = useScoreAPI();
  const [scores, setScores] = useState<ScoreAPIScores | null>(null);

  const credit_score = getCurrentScore(scores);
  const { diff, last_updated } = getChangeSinceLastScore(scores);
  const credit_score_rating = getScoreRule(credit_score);

  useEffect(
    function () {
      (async function () {
        const scores = await fetchScores(display_token);

        setScores(scores);
      })();
    },
    [fetchScores, display_token]
  );

  const last_updated_day = last_updated ? parseLastUpdatedDay(new Date(last_updated)) : -1;

  return (
    <div className={classes.SimpleScoreDisplay}>
      <div className={classes.SimpleScoreData}>
        <div className={classes.SimpleScoreNumber}>{credit_score}</div>
        <div className={classes.SimpleScoreText}>{(credit_score_rating && credit_score_rating.text) || null}</div>
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
