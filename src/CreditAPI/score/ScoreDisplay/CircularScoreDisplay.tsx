import React from "react";
import { ScoresObj } from "src/CreditAPI/score/useScore";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import UpSvg from "./assets/up.svg";
import DownSvg from "./assets/down.svg";
import TUSvg from "./assets/tu.svg";
import getCurrentScore from "./utils/getCurrentScore";
import getChangeSinceLastScore from "./utils/getChangeSinceLastScore";
import getScoreRule from "./utils/getScoreRule";
import parseLastUpdatedDay from "./utils/parseLastUpdatedDay";
import injectSheet, { Styles } from "react-jss";

type CircularScoreDisplayProps = {
  classes: CircularScoreDisplayClassNames;
  scores: ScoresObj | null;
};

export type CircularScoreDisplayClassNames = {
  CircularScoreDisplay?: string;
  CircularScoreInformation?: string;
  CircularScoreDifference?: string;
  CircularScoreNumber?: string;
  CircularScoreText?: string;
  CircularScoreUpdated?: string;
  CircularScoreProvided?: string;
  CircularScoreMinMax?: string;
};

const styles = {
  CircularScoreDisplay: {
    position: "relative",
  },
  CircularScoreInformation: {
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
  },
  CircularScoreDifference: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
    "& img": { width: "auto", height: 16 },
    "& span": { whiteSpace: "nowrap", lineHeight: 1, fontSize: 18, marginLeft: 5 },
    "&.positive": { color: "#21cc6f" },
    "&.negative": { color: "#ec654d", "& svg": { marginTop: -2 } },
  },
  CircularScoreNumber: {
    lineHeight: 1,
    color: "#000",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 38,
  },
  CircularScoreText: {
    color: "#666",
    fontSize: 18,
    textTransform: "uppercase",
    marginTop: 5,
  },
  CircularScoreUpdated: {
    margin: { top: 15, bottom: 15 },
    color: "#999",
    fontSize: 14,
  },
  CircularScoreProvided: {
    display: "flex",
    alignItems: "center",
    "& img": { width: 20, height: "auto" },
    "& span": { margin: "2px 0 0 5px", fontSize: 14, color: "#d8d8d8", fontWeight: 500 },
  },
  CircularScoreMinMax: {
    fontWeight: "600",
    fontSize: 20,
  },
};

const default_color = "#c5c5c5";

export function CircularScoreDisplay(props: CircularScoreDisplayProps): JSX.Element {
  const classes = props.classes;
  const scores = props.scores;

  const credit_score = getCurrentScore(scores);
  const credit_score_rating = getScoreRule(credit_score);
  const { diff, last_updated } = getChangeSinceLastScore(scores);

  const pie_chart_data = [
    { value: credit_score || 0, min_score: 300 },
    { value: 850 - (credit_score || 0), max_score: 850 },
  ];

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
            label={<ScoreMinMaxLabel className={classes.CircularScoreMinMax} />}
            labelLine={false}
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

type ScoreMinMaxLabelProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  className: any;
  cx?: number;
  cy?: number;
  max_score?: number;
  min_score?: number;
  middleRadius?: number;
};

function ScoreMinMaxLabel(props: ScoreMinMaxLabelProps) {
  const { className, cx = 0, cy = 0, max_score, min_score, middleRadius = 0 } = props;

  let x = 0;
  let y = 0;
  const radius = middleRadius;

  if (max_score) {
    x = cx + (radius * Math.sqrt(2)) / 2;
    y = cy + (radius * Math.sqrt(2)) / 2;
  } else if (min_score) {
    x = cx - (radius * Math.sqrt(2)) / 2;
    y = cy + (radius * Math.sqrt(2)) / 2;
  }

  return (
    <text
      textAnchor={max_score ? "end" : "start"}
      x={x}
      y={y}
      dx={(max_score ? -1 : 1) * 15}
      dy="10"
      className={className}
    >
      {max_score || min_score}
    </text>
  );
}

export default injectSheet(styles as Styles)(CircularScoreDisplay);
