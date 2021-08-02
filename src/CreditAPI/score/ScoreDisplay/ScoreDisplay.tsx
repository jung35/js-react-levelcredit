import React from "react";
import useScore from "src/CreditAPI/score/useScore";
import SimpleScoreDisplay, { SimpleScoreDisplayClassNames } from "./SimpleScoreDisplay";
import CircularScoreDisplay, { CircularScoreDisplayClassNames } from "./CircularScoreDisplay";
import { CreditDisplayToken } from "src/CreditAPI/types";

export const SCORE_SIMPLE_DISPLAY = "simple";
export const SCORE_DONUT_DISPLAY = "donut";

type ScoreDisplayTypeSimple = {
  dataDisplayStyle: "simple";
  classes?: SimpleScoreDisplayClassNames;
};

type ScoreDisplayTypeDonu = {
  dataDisplayStyle: "donut";
  classes?: CircularScoreDisplayClassNames;
};

type ScoreAPIScoreProps = {
  display_token: CreditDisplayToken;
} & (ScoreDisplayTypeSimple | ScoreDisplayTypeDonu);

function ScoreDisplay(props: ScoreAPIScoreProps): JSX.Element {
  const classes = props.classes;
  const display_style = props.dataDisplayStyle || SCORE_SIMPLE_DISPLAY;

  const [scores] = useScore(props.display_token);

  if (display_style === SCORE_SIMPLE_DISPLAY) {
    return <SimpleScoreDisplay classes={classes} scores={scores} />;
  }

  if (display_style === SCORE_DONUT_DISPLAY) {
    return <CircularScoreDisplay classes={classes} scores={scores} />;
  }

  return <div></div>;
}

export default ScoreDisplay;
