import React from "react";
import { TradelineStatusObject } from "@levelcredit/js-lib-api/Obligation/Tradeline/types";
import { ObligationTradelineObject, TradelineStatus } from "../types";
import ReportingCheck from "./assets/ReportingCheck";
import ReportingDot from "./assets/ReportingDot";
import {
  PENDING_REPORT,
  PENDING_REPORT_HOLD,
  POSITIVE_LOOKBACK_AVAILABLE,
  POSITIVE_LOOKBACK_REPORT,
  POSITIVE_REPORT,
  NEGATIVE_LATE_30,
  NEGATIVE_LATE_60,
  NEGATIVE_LATE_90,
  NEGATIVE_LATE_120,
  NEGATIVE_LATE_150,
  NEGATIVE_LATE_180,
  NO_PAYMENT,
} from "../constants";
import injectSheet, { Styles } from "react-jss";

const months_loop = new Array(12).fill(0);

export type ReportingHistoryYearClasses = {
  TableColumnYear?: string;
  TableColumn?: string;
} & ReportingHistoryStatusClasses;

type ReportingHistoryYearProps = {
  classes: ReportingHistoryYearClasses;
  year: number;
  tradeline: ObligationTradelineObject;
};

function ReportingHistoryYear(props: ReportingHistoryYearProps): JSX.Element {
  const { classes, year, tradeline } = props;

  return (
    <tr>
      <td className={classes.TableColumnYear}>
        <span>{year}</span>
      </td>
      {months_loop.map(function (val, i) {
        const formatted_month = (i + 1).toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
        const report_data: null | TradelineStatusObject = tradeline[`${year}-${formatted_month}`];

        return (
          <td key={i} className={classes.TableColumn}>
            <ReportingHistoryStatus classes={classes} report_data={report_data} />
          </td>
        );
      })}
    </tr>
  );
}

type ReportingHistoryStatusClasses = {
  [key in TradelineStatus]?: string;
};

type ReportingHistoryStatusProps = {
  classes: ReportingHistoryStatusClasses;
  report_data: null | TradelineStatusObject;
};

function ReportingHistoryStatus(props: ReportingHistoryStatusProps) {
  const classes = props.classes;
  const report_data = props.report_data;

  if (!report_data || !report_data.status) {
    return (
      <span className={classes[NO_PAYMENT]}>
        <ReportingDot />
      </span>
    );
  }

  switch (report_data.status) {
    case POSITIVE_REPORT:
      return (
        <span className={classes[POSITIVE_REPORT]}>
          <ReportingCheck />
        </span>
      );
    case POSITIVE_LOOKBACK_REPORT:
      return (
        <span className={classes[POSITIVE_LOOKBACK_REPORT]}>
          <ReportingCheck />
        </span>
      );
    case POSITIVE_LOOKBACK_AVAILABLE:
      return (
        <span className={classes[POSITIVE_LOOKBACK_AVAILABLE]}>
          <ReportingCheck />
        </span>
      );
    case PENDING_REPORT_HOLD:
      return (
        <span className={classes[PENDING_REPORT_HOLD]}>
          <ReportingCheck />
        </span>
      );
    case PENDING_REPORT:
      return (
        <span className={classes[PENDING_REPORT]}>
          <ReportingCheck />
        </span>
      );
    case NEGATIVE_LATE_30:
      return <span className={classes[NEGATIVE_LATE_30]}>30</span>;
    case NEGATIVE_LATE_60:
      return <span className={classes[NEGATIVE_LATE_60]}>60</span>;
    case NEGATIVE_LATE_90:
      return <span className={classes[NEGATIVE_LATE_90]}>120</span>;
    case NEGATIVE_LATE_120:
      return <span className={classes[NEGATIVE_LATE_120]}>120</span>;
    case NEGATIVE_LATE_150:
      return <span className={classes[NEGATIVE_LATE_150]}>150</span>;
    case NEGATIVE_LATE_180:
      return <span className={classes[NEGATIVE_LATE_180]}>180+</span>;
    case NO_PAYMENT:
    default:
      return (
        <span className={classes[NO_PAYMENT]}>
          <ReportingDot />
        </span>
      );
  }
}

const styles: unknown = {
  TableColumnYear: {
    width: 48,
    fontSize: 14.5,
    fontWeight: "bold",
    padding: [17, 0, 0],
    height: 28,
    verticalAlign: "middle",

    "& span": {
      color: "#2d3b4e",
      background: "rgba(226, 226, 226, 0)",
      lineHeight: "100%",
      transition: "color 180ms linear, background-color 180ms linear, line-height 180ms linear",
    },
  },
  TableColumn: {
    padding: [17, 0, 0],
    width: 28,
    textAlign: "center",
  },

  TableColumnStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 1,
    height: 28,
    verticalAlign: "middle",
    backgroundColor: "transparent",
    color: "#e2e2e2",
    transition: "background-color 180ms linear, color 180ms linear",

    "& svg": {
      width: 9,
      height: "auto",
    },
  },

  [NO_PAYMENT]: {
    extend: "TableColumnStatus",

    "& svg": {
      height: "auto",
      fill: "#e2e2e2",
    },
  },

  [POSITIVE_REPORT]: {
    extend: "TableColumnStatus",

    "& svg": { fill: "#18b798" },
  },

  [POSITIVE_LOOKBACK_REPORT]: {
    extend: "TableColumnStatus",

    "& svg": { fill: "#468ee5" },
  },

  [POSITIVE_LOOKBACK_AVAILABLE]: {
    extend: "TableColumnStatus",

    border: "1px dashed #468ee5",
    borderRadius: "50%",
    fontSize: 8,
    height: 25,
    width: 25,

    "& svg": { fill: "#468ee5", width: 8 },
  },

  [PENDING_REPORT_HOLD]: {
    extend: "TableColumnStatus",

    border: "1px dashed #777",
    fontSize: 8,
    borderRadius: "50%",
    height: 25,
    width: 25,

    "& svg": { fill: "#777", width: 8 },
  },

  [PENDING_REPORT]: {
    extend: "TableColumnStatus",

    "& svg": { fill: "#777" },
  },

  [NEGATIVE_LATE_30]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#fecc09",
  },

  [NEGATIVE_LATE_60]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#ff5c36",
  },

  [NEGATIVE_LATE_90]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#ef4723",
  },

  [NEGATIVE_LATE_120]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#ef4723",
  },

  [NEGATIVE_LATE_150]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#ef4723",
  },

  [NEGATIVE_LATE_180]: {
    extend: "TableColumnStatus",

    alignItems: "center",
    fontFamily: "Lato, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    borderRadius: "50%",
    height: 25,
    width: 25,
    color: "#fff",
    backgroundColor: "#ef4723",
  },
};

export default injectSheet(styles as Styles)(ReportingHistoryYear);
