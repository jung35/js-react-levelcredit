import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import parseScoresForChart, { ChartScoreParseStyle } from "../utils/parseScoresForChart";
import { useScoreAPI, ScoreAPIScores } from "./useScoreAPI";
import { createUseStyles, DefaultTheme, Styles } from "react-jss";

type ScoreAPIChartStyles = {
  theme?: DefaultTheme;
  dataParseStyle?: ChartScoreParseStyle;
  XAxisStyles?: Styles;
  YAxisStyles?: Styles;
  LineStyles?: Styles;
  TooltipContentStyles?: Styles;
};

type ScoreAPIChartProps = ScoreAPIChartStyles & {
  display_token: string;
};

const useStyles = createUseStyles(
  {
    root: {},
    XAxis: (props: ScoreAPIChartStyles) => ({
      fontSize: 12,
      fill: "#666",
      textAnchor: "end",
      x: 0,
      y: 0,
      transform: "rotate(-35deg) translate(0, 15px)",
      ...(props.XAxisStyles || {}),
    }),
    YAxis: (props: ScoreAPIChartStyles) => ({
      fontSize: 12,
      fill: "#666",
      textAnchor: "end",
      x: 0,
      y: 0,
      transform: "translate(0, 5px)",
      ...(props.YAxisStyles || {}),
    }),
    Line: (props: ScoreAPIChartStyles) => ({
      stroke: "#8884d8",
      ...(props.LineStyles || {}),
    }),
    TooltipContentStyles: (props: ScoreAPIChartStyles) => ({
      fontSize: 12,
      padding: 7,
      backgroundColor: "#fff",
      border: "1px solid #777",
      ...(props.TooltipContentStyles || {}),
      "& p.label": {
        fontWeight: "bold",
        fontSize: 13,
        ...((props.TooltipContentStyles && (props.TooltipContentStyles["& p.label"] as Styles)) || {}),
      },
      "& p": {
        margin: 0,
        ...((props.TooltipContentStyles && (props.TooltipContentStyles["& p"] as Styles)) || {}),
      },
    }),
  },
  { name: "ScoreAPIChart" }
);

export function ScoreAPIChart(props: ScoreAPIChartProps): JSX.Element {
  const { display_token, ...rest } = props;
  const classes = useStyles(rest);
  const fetchScores = useScoreAPI();
  const [scores, setScores] = useState<ScoreAPIScores | null>(null);
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
    <div className={classes.root}>
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
          <Tooltip content={<TooltipContent className={classes.TooltipContentStyles} />} />
          <Line
            connectNulls
            type="monotone"
            dataKey="score"
            className={classes.Line}
            stroke={(props.LineStyles?.stroke as string) || "#666"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

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
