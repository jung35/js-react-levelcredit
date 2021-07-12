import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useInsights, { InsightsObj } from "src/CreditAPI/insights/useInsights";
import { CreditDisplayToken } from "src/CreditAPI/types";
import AccountCount from "./AccountCount";

type AccountSummaryProps = {
  classes: {
    AccountSummary?: string;
    SummaryItem?: string;
    SummaryValue?: string;
    SummaryLabel?: string;
  };
  display_token: CreditDisplayToken;
};

function AccountSummary(props: AccountSummaryProps) {
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

  const total_accounts = insights?.total_accounts;

  return (
    <div className={classes.AccountSummary}>
      <div className={classes.SummaryItem}>
        <AccountCount total_accounts={total_accounts} />
      </div>
      <div className={classes.SummaryItem}>
        <div className={classes.SummaryValue}>{(total_accounts?.total || 0) - (total_accounts?.derogatory || 0)}</div>
        <div className={classes.SummaryLabel}>In good standing</div>
      </div>
      <div className={classes.SummaryItem}>
        <div className={classes.SummaryValue}>{total_accounts?.derogatory || 0}</div>
        <div className={classes.SummaryLabel}>Potentially negative</div>
      </div>
      <div className={classes.SummaryItem}>
        <div className={classes.SummaryValue}>
          $
          {(insights?.total_monthly_payments || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className={classes.SummaryLabel}>Monthly Payments</div>
      </div>
      <div className={classes.SummaryItem}>
        <div className={classes.SummaryValue}>
          {insights?.oldest_tradeline_years || 0} {insights?.oldest_tradeline_years === 1 ? "yr" : "yrs"}
        </div>
        <div className={classes.SummaryLabel}>Oldest Account</div>
      </div>
      <div className={classes.SummaryItem}>
        <div className={classes.SummaryValue}>{insights?.total_inquiries || 0}</div>
        <div className={classes.SummaryLabel}>Total Inquiries</div>
      </div>
    </div>
  );
}

const styles = {
  AccountSummary: {
    display: "flex",
    flexWrap: "wrap",
  },
  SummaryItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    minHeight: 89,
    width: "50%",
    "@media (min-width: 600px)": { width: "33.33%" },
  },
  SummaryValue: {
    fontWeight: 600,
    fontSize: 22,
  },
  SummaryLabel: {
    fontSize: 14,
    lineHeight: 1,
    color: "#979797",
    margin: { top: 10, bottom: 5 },
  },
};

export default injectSheet(styles as Styles)(AccountSummary);
