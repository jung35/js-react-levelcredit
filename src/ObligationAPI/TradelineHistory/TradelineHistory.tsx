import { ObligationType } from "@levelcredit/js-lib-api/Obligation/types";
import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useObligationTradeline from "../hooks/useObligationTradeline";
import { ObligationTradelineObject } from "../types";
import moment from "moment";
import getTradelineDateRange from "./utils/getTradelineDateRange";
import ReportingHistoryYear, { ReportingHistoryYearClasses } from "./ReportingHistoryYear";

type TradelineHistoryProps = {
  classes: {
    TradelineHistory?: string;
    TableHead?: string;
    TableColumnHead?: string;
    TableBody?: string;
  } & ReportingHistoryYearClasses;
  obligation: ObligationType;
  obligation_id: number;
};

const today = moment();
const current_year = today.year();
const months_loop = new Array(12).fill(0);

function TradelineHistory(props: TradelineHistoryProps) {
  const [tradeline, setTradeline] = useState<ObligationTradelineObject>({});

  const classes = props.classes;
  const obligation = props.obligation;
  const obligation_id = props.obligation_id;
  const fetchTradeline = useObligationTradeline();
  const { end_date, start_date } = getTradelineDateRange(Object.keys(tradeline));

  useEffect(
    function () {
      (async function () {
        const tradeline = await fetchTradeline(obligation, obligation_id);

        setTradeline(tradeline);
      })();
    },
    [fetchTradeline, obligation, obligation_id]
  );

  return (
    <table className={classes.TradelineHistory} cellSpacing={0}>
      <thead className={classes.TableHead}>
        <tr>
          <th className={classes.TableColumnHead} />
          {months_loop.map(function (val, i) {
            return (
              <th key={i} className={classes.TableColumnHead}>
                {moment().month(i).format("MMM").charAt(0)}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={classes.TableBody}>
        {new Array((end_date.year || 0) - (start_date.year || 0) + 1).fill(0).map(function (val, i) {
          return (
            <ReportingHistoryYear
              key={i}
              year={(end_date.year || current_year) - i}
              tradeline={tradeline}
              classes={classes}
            />
          );
        })}
      </tbody>
    </table>
  );
}

const styles: unknown = {
  TradelineHistory: {
    width: "100%",
  },
  TableHead: {},
  TableColumnHead: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2d3b4e",
    width: 32,
  },
  TableBody: {},
};

export default injectSheet(styles as Styles)(TradelineHistory);
