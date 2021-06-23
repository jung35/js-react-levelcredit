import React from "react";
import injectSheet, { Styles } from "react-jss";
import { ScoreAPIDisplayToken } from "../useScoreAPI";
import SimpleScoreDisplay, {
  SimpleScoreDataStyles,
  SimpleScoreDifferenceStyles,
  SimpleScoreDisplayStyles,
  SimpleScoreNumberStyles,
  SimpleScoreTextStyles,
  SimpleScoreProvidedStyles,
} from "./SimpleScoreDisplay";

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
  SimpleScoreDisplay: SimpleScoreDisplayStyles,
  SimpleScoreData: SimpleScoreDataStyles,
  SimpleScoreNumber: SimpleScoreNumberStyles,
  SimpleScoreText: SimpleScoreTextStyles,
  SimpleScoreDifference: SimpleScoreDifferenceStyles,
  SimpleScoreProvided: SimpleScoreProvidedStyles,
};

function ScoreAPIScore(props: ScoreAPIScoreProps): JSX.Element {
  const classes = props.classes;
  const display_style = props.dataDisplayStyle || "simple";
  const display_token = props.display_token;

  if (display_style === "simple") {
    return <SimpleScoreDisplay classes={classes} display_token={display_token} />;
  }

  return <div className={classes.root}></div>;
}

const fallbackHOC = injectSheet(styles as Styles)(ScoreAPIScore);

export { fallbackHOC as ScoreAPIScore };
