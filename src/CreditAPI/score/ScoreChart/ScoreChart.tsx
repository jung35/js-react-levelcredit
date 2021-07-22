import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import parseScoresForChart, { ChartScoreParseStyle } from "src/CreditAPI/score/ScoreChart/utils/parseScoresForChart";
import useScores from "src/CreditAPI/score/useScore";
import injectSheet, { Styles } from "react-jss";
import { CreditDisplayToken } from "src/CreditAPI/types";
import { ScoreObject } from "@levelcredit/js-lib-api/Credit/Score/types";

type ScoreChartProps = {
  classes: {
    ScoreChart?: string;
    XAxis?: string;
    YAxis?: string;
    Line?: string;
    TooltipContent?: string;
  };
  display_token: CreditDisplayToken;
  dataParseStyle?: ChartScoreParseStyle;
};

const styles: unknown = {
  ScoreChart: {},
  XAxis: { fontSize: 12, fill: "#666", textAnchor: "end", x: 0, y: 0, transform: "rotate(-35deg) translate(0, 15px)" },
  YAxis: { fontSize: 12, fill: "#666", textAnchor: "end", x: 0, y: 0, transform: "translate(0, 5px)" },
  Line: { "& path": { stroke: "#666" }, "& circle": { stroke: "#666" } },
  TooltipContent: {
    fontSize: 12,
    padding: 7,
    backgroundColor: "#fff",
    border: "1px solid #777",
    "& p.label": { fontWeight: "bold", fontSize: 13 },
    "& p": { margin: 0 },
  },
};

function ScoreChart(props: ScoreChartProps): JSX.Element {
  const display_token = props.display_token;
  const classes = props.classes;
  const fetchScores = useScores();
  const [scores, setScores] = useState<ScoreObject | null>(null);
  const [chart_data, scores_min, scores_max] = parseScoresForChart(scores, props.dataParseStyle || "11-months-past");

  useEffect(
    function () {
      (async function () {
        const scores = await fetchScores(display_token);

        setScores(scores);
      })();
    },
    [fetchScores, display_token]
  );

  const chart_min = scores_min ? Math.max(scores_min - (scores_min % 10 || 10), 300) : 0;
  const chart_max = scores_max ? Math.min(scores_max + 10 - (scores_max % 10), 850) : 0;

  return (
    <div className={classes.ScoreChart}>
      <ResponsiveContainer aspect={2.33} minHeight={100}>
        <LineChart data={chart_data} margin={{ top: 10, right: 10 }}>
          <CartesianGrid strokeDasharray="4 1 2" vertical={false} />
          <XAxis
            dataKey="month"
            interval={0}
            height={60}
            tickLine={false}
            tick={<AxisTick className={classes.XAxis} />}
          />
          <YAxis domain={[chart_min, chart_max]} tickLine={false} tick={<AxisTick className={classes.YAxis} />} />
          <Tooltip content={<TooltipContent className={classes.TooltipContent} />} />
          <Line connectNulls type="monotone" dataKey="score" className={classes.Line} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const fallbackHOC = injectSheet(styles as Styles)(ScoreChart);

export default fallbackHOC;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AxisTick(props: any) {
  const { x, y, payload, className } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text className={className}>{payload.value}</text>
    </g>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TooltipContent(props: any) {
  const { active, payload, className } = props;

  if (active && payload && payload.length) {
    return (
      <div className={className}>
        <p className="label">{payload[0].payload.date}</p>
        <p className="intro">Score: {payload[0].value}</p>
      </div>
    );
  }

  return null;
}
