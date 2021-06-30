import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useScores, { ScoreDisplayToken, ScoresObj } from "src/CreditAPI/scores/useScores";
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
  display_token: ScoreDisplayToken;
  dataDisplayStyle?: ScoreAPIScoreDisplayStyle;
};

const styles: unknown = {
  ...SimpleScoreDisplayStyles,
  ...CircularScoreDisplayStyles,
};

function ScoreDisplay(props: ScoreAPIScoreProps): JSX.Element {
  const classes = props.classes;
  const display_style = props.dataDisplayStyle || SCORE_SIMPLE_DISPLAY;
  const display_token = props.display_token;

  const fetchScores = useScores();
  const [scores, setScores] = useState<ScoresObj | null>(null);

  useEffect(
    function () {
      (async function () {
        const scores = await fetchScores(display_token);

        setScores(scores);
      })();
    },
    [fetchScores, display_token]
  );

  if (display_style === SCORE_SIMPLE_DISPLAY) {
    return <SimpleScoreDisplay classes={classes} scores={scores} />;
  }

  if (display_style === SCORE_DONUT_DISPLAY) {
    return <CircularScoreDisplay classes={classes} scores={scores} />;
  }

  return <div className={classes.root}></div>;
}

const fallbackHOC = injectSheet(styles as Styles)(ScoreDisplay);

export default fallbackHOC;
