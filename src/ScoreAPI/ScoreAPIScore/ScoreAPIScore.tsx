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

const styles: unknown = {
  ...SimpleScoreDisplayStyles,
  ...CircularScoreDisplayStyles,
};

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
