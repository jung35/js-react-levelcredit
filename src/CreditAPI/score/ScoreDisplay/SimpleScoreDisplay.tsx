import React from "react";
import UpSvg from "./assets/up.svg";
import DownSvg from "./assets/down.svg";
import TUSvg from "./assets/tu.svg";
import getCurrentScore from "./utils/getCurrentScore";
import getChangeSinceLastScore from "./utils/getChangeSinceLastScore";
import getScoreRule from "./utils/getScoreRule";
import parseLastUpdatedDay from "./utils/parseLastUpdatedDay";
import injectSheet, { Styles } from "react-jss";
import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

type SimpleScoreDisplayProps = {
  classes: SimpleScoreDisplayClassNames;
  scores: ScoreObject | null;
};

export type SimpleScoreDisplayClassNames = {
  SimpleScoreDisplay?: string;
  SimpleScoreData?: string;
  SimpleScoreNumber?: string;
  SimpleScoreText?: string;
  SimpleScoreDifference?: string;
  SimpleScoreProvided?: string;
};

export const styles = {
  SimpleScoreDisplay: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  SimpleScoreData: {
    display: "flex",
    alignItems: "flex-end",
  },
  SimpleScoreNumber: {
    lineHeight: 0.9,
    color: "#000",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 36,
  },
  SimpleScoreText: {
    color: "#666",
    fontSize: 18,
    marginLeft: 10,
  },
  SimpleScoreDifference: {
    display: "flex",
    alignItems: "flex-end",
    "& img": { width: "auto", height: 16 },
    "& span": { whiteSpace: "nowrap", lineHeight: 0.9, fontSize: 18, marginLeft: 5 },
    "&.positive": { color: "#21cc6f" },
    "&.negative": { color: "#ec654d", "& svg": { marginTop: -2 } },
  },
  SimpleScoreProvided: {
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
  },
};

export function SimpleScoreDisplay(props: SimpleScoreDisplayProps): JSX.Element {
  const classes = props.classes;
  const scores = props.scores;

  const credit_score = getCurrentScore(scores);
  const { diff, last_updated } = getChangeSinceLastScore(scores);
  const credit_score_rating = getScoreRule(credit_score);

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

export default injectSheet(styles as Styles)(SimpleScoreDisplay);
