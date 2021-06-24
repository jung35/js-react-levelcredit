import React, { useEffect, useState } from "react";
import { ScoreAPIDisplayToken, ScoreAPIScores, useScoreAPI } from "../useScoreAPI";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getChangeSinceLastScore, getCurrentScore, getScoreRule, parseLastUpdatedDay } from "./ScoreAPIScore";
import UpSvg from "./assets/up.svg";
import DownSvg from "./assets/down.svg";
import TUSvg from "./assets/tu.svg";

type CircularScoreDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes?: any;
  display_token: ScoreAPIDisplayToken;
};

const CircularScoreDisplayStyles = {
  position: "relative",
};

const CircularScoreInformationStyles = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  flexDirection: "column",
};

const CircularScoreNumberStyles = {
  lineHeight: 1,
  color: "#000",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 38,
};

const CircularScoreDifferenceStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: 5,
  "& img": { width: "auto", height: 16 },
  "& span": { whiteSpace: "nowrap", lineHeight: 1, fontSize: 18, marginLeft: 5 },
  "&.positive": { color: "#21cc6f" },
  "&.negative": { color: "#ec654d", "& svg": { marginTop: -2 } },
};

const CircularScoreTextStyles = {
  color: "#666",
  fontSize: 18,
  textTransform: "uppercase",
  marginTop: 5,
};

const CircularScoreUpdatedStyles = {
  margin: { top: 15, bottom: 15 },
  color: "#999",
  fontSize: 14,
};

const CircularScoreProvidedStyles = {
  display: "flex",
  alignItems: "center",
  "& img": { width: 20, height: "auto" },
  "& span": { margin: "2px 0 0 5px", fontSize: 14, color: "#d8d8d8", fontWeight: 500 },
};

export const styles = {
  CircularScoreDisplay: CircularScoreDisplayStyles,
  CircularScoreInformation: CircularScoreInformationStyles,
  CircularScoreDifference: CircularScoreDifferenceStyles,
  CircularScoreNumber: CircularScoreNumberStyles,
  CircularScoreText: CircularScoreTextStyles,
  CircularScoreUpdated: CircularScoreUpdatedStyles,
  CircularScoreProvided: CircularScoreProvidedStyles,
};

const default_color = "#c5c5c5";

export default function CircularScoreDisplay(props: CircularScoreDisplayProps): JSX.Element {
  const classes = props.classes;
  const display_token = props.display_token;

  const fetchScores = useScoreAPI();
  const [scores, setScores] = useState<ScoreAPIScores | null>(null);
  const credit_score = getCurrentScore(scores);
  const credit_score_rating = getScoreRule(credit_score);
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

  const pie_chart_data = [{ value: credit_score || 0 }, { value: 850 - (credit_score || 0) }];

  const chart_colors = [credit_score_rating ? credit_score_rating.color : "#0088FE", default_color];
  const last_updated_day = last_updated ? parseLastUpdatedDay(new Date(last_updated)) : -1;

  return (
    <div className={classes.CircularScoreDisplay}>
      <div className={classes.CircularScoreInformation}>
        {diff !== 0 && (
          <div className={`${classes.CircularScoreDifference}${diff > 0 ? " positive" : diff < 0 ? " negative" : ""}`}>
            <img src={diff > 0 ? UpSvg : DownSvg} />
            <span>{diff}</span>
          </div>
        )}
        <div className={classes.CircularScoreNumber}>{credit_score}</div>
        <div className={classes.CircularScoreText}>{(credit_score_rating && credit_score_rating.text) || null}</div>

        {last_updated_day >= 0 && (
          <div className={classes.CircularScoreUpdated}>
            Last updated {last_updated_day === 0 ? "today" : `${last_updated_day}d ago`}
          </div>
        )}

        <div className={classes.CircularScoreProvided}>
          <img src={TUSvg} />
          <span>VantageScore 3.0</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pie_chart_data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={"100%"}
            innerRadius={"80%"}
            fill="#8884d8"
            startAngle={225}
            endAngle={-45}
            paddingAngle={5}
          >
            {pie_chart_data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chart_colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
