import React from "react";
import injectSheet, { Styles } from "react-jss";
import { ScoreAPIDisplayToken } from "../useScoreAPI";
import SimpleScoreDisplay, { styles as SimpleScoreDisplayStyles } from "./SimpleScoreDisplay";
import CircularScoreDisplay, { styles as CircularScoreDisplayStyles } from "./CircularScoreDisplay";

export const SCORE_SIMPLE_DISPLAY = "simple";
export const SCORE_DONUT_DISPLAY = "donut";

type ScoreAPIScoreDisplayStyle = "simple" | "donut";
type ScoreAPIScoreStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes?: any;
};

type ScoreAPIScoreProps = ScoreAPIScoreStyles & {
  display_token: ScoreAPIDisplayToken;
  dataDisplayStyle?: ScoreAPIScoreDisplayStyle;
};

const styles: unknown = {
  ...SimpleScoreDisplayStyles,
  ...CircularScoreDisplayStyles,
};

function ScoreAPIScore(props: ScoreAPIScoreProps): JSX.Element {
  const classes = props.classes;
  const display_style = props.dataDisplayStyle || SCORE_SIMPLE_DISPLAY;
  const display_token = props.display_token;

  if (display_style === SCORE_SIMPLE_DISPLAY) {
    return <SimpleScoreDisplay classes={classes} display_token={display_token} />;
  }

  if (display_style === SCORE_DONUT_DISPLAY) {
    return <CircularScoreDisplay classes={classes} display_token={display_token} />;
  }

  return <div className={classes.root}></div>;
}

const fallbackHOC = injectSheet(styles as Styles)(ScoreAPIScore);

export { fallbackHOC as ScoreAPIScore };
