import React, { useEffect, useState } from "react";
import useScores from "src/CreditAPI/score/useScore";
import SimpleScoreDisplay, { SimpleScoreDisplayClassNames } from "./SimpleScoreDisplay";
import CircularScoreDisplay, { CircularScoreDisplayClassNames } from "./CircularScoreDisplay";
import { CreditDisplayToken } from "src/CreditAPI/types";
import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

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
  const display_token = props.display_token;

  const fetchScores = useScores();
  const [scores, setScores] = useState<ScoreObject | null>(null);

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

  return <div></div>;
}

export default ScoreDisplay;
