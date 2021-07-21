import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import { CreditDisplayToken } from "src/CreditAPI/types";
import useInsights from "../useInsights";
import { InsightsObject } from "@levelcredit/js-lib-api/Credit/Insights/types";

type CreditUtilizationProps = {
  classes: {
    CreditUtilization?: string;
    UtilizationValue?: string;
    UtilizationRating?: string;
  };

  display_token: CreditDisplayToken;
};

type UtilizationRatingGroup = { min: number; max?: number; label: string; color: string };

const rating_groups: UtilizationRatingGroup[] = [
  { min: 75, label: "75 +", color: "#bc2026" },
  { min: 50, max: 75, label: "50 - 74", color: "#f68e1f" },
  { min: 30, max: 50, label: "30 - 49", color: "#ffd226" },
  { min: 10, max: 30, label: "10 - 29", color: "#7dbb42" },
  { min: 0, max: 10, label: "0 - 9", color: "#0f9246" },
];

function CreditUtilization(props: CreditUtilizationProps): JSX.Element {
  const classes = props.classes;
  const display_token = props.display_token;

  const fetchInsights = useInsights();
  const [insights, setInsights] = useState<InsightsObject | null>(null);

  useEffect(
    function () {
      (async function () {
        const insights = await fetchInsights(display_token);

        setInsights(insights);
      })();
    },
    [fetchInsights, display_token]
  );

  const utilization = insights && insights.utilization >= 0 ? insights.utilization : NaN;

  return (
    <div className={classes.CreditUtilization}>
      {!isNaN(utilization) ? <div className={classes.UtilizationValue}>{utilization}%</div> : ""}
      <div className={classes.UtilizationRating}>
        {rating_groups.map(function (group: UtilizationRatingGroup, i) {
          const is_under_max = !group.max || utilization < group.max;
          const is_over_min = utilization >= group.min;

          const is_selected = is_under_max && is_over_min;

          return (
            <div key={i} className={`l${i + 1}${is_selected ? " selected" : ""}`}>
              {group.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rating_styles: any = {};

for (let i = 0; i < rating_groups.length; i++) {
  rating_styles[`&.l${i + 1}`] = {
    "&:before": { backgroundColor: rating_groups[i].color, opacity: 0.2 },
    "&.selected:before": { opacity: 1 },
  };
}

const styles = {
  CreditUtilization: {
    width: "100%",
    maxWidth: 270,
    margin: [0, "auto"],
  },
  UtilizationValue: {
    textAlign: "center",
    fontSize: 70,
    lineHeight: 1,
    margin: [0, 0, 15],
  },
  UtilizationRating: {
    display: "flex",

    "& > div": {
      flex: 1,
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: 1,
      color: "#000",
      textAlign: "center",

      "&:before": {
        content: '""',
        display: "block",
        width: "90%",
        height: 6,
        borderRadius: 4,
        backgroundColor: "#eee",
        margin: [0, "auto", 10],
      },

      ...rating_styles,
    },
  },
};

export default injectSheet(styles as Styles)(CreditUtilization);
