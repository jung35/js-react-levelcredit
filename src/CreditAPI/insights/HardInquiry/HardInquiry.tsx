import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useInsights, { InsightsDisplayToken, InsightsObj } from "../useInsights";

type HardInquiryProps = {
  classes: {
    HardInquiry?: string;
    HardInquiryValue?: string;
    HardInquiryRating?: string;
  };

  display_token: InsightsDisplayToken;
};

type HardInquiryRatingGroup = { min?: number; max?: number; label: string; color: string };

const rating_groups: HardInquiryRatingGroup[] = [
  { min: 9, label: "9 +", color: "#bc2026" },
  { min: 5, max: 9, label: "5 - 8", color: "#f68e1f" },
  { min: 3, max: 5, label: "3 - 4", color: "#ffd226" },
  { min: 1, max: 3, label: "1 - 2", color: "#7dbb42" },
  { max: 1, label: "0", color: "#0f9246" },
];

function HardInquiry(props: HardInquiryProps): JSX.Element {
  const classes = props.classes;
  const display_token = props.display_token;

  const fetchInsights = useInsights();
  const [insights, setInsights] = useState<InsightsObj | null>(null);

  useEffect(
    function () {
      (async function () {
        const insights = await fetchInsights(display_token);

        setInsights(insights);
      })();
    },
    [fetchInsights, display_token]
  );

  const inquiries = insights && insights.total_inquiries >= 0 ? insights.total_inquiries : NaN;

  return (
    <div className={classes.HardInquiry}>
      {!isNaN(inquiries) ? <div className={classes.HardInquiryValue}>{inquiries}</div> : ""}
      <div className={classes.HardInquiryRating}>
        {rating_groups.map(function (group: HardInquiryRatingGroup, i) {
          const is_under_max = !group.max || inquiries < group.max;
          const is_over_min = !group.min || inquiries >= group.min;

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
  HardInquiry: {
    width: "100%",
    maxWidth: 270,
    margin: [0, "auto"],
  },
  HardInquiryValue: {
    fontSize: 70,
    lineHeight: 1,
    margin: [0, 0, 15],
  },
  HardInquiryRating: {
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

export default injectSheet(styles as Styles)(HardInquiry);
