import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useInsights, { InsightsDisplayToken, InsightsObj } from "src/CreditAPI/insights/useInsights";

type CreditBalanceProps = {
  classes: {
    CreditBalance?: string;
    BalanceList?: string;
    ListItemHeader?: string;
    ListItem?: string;
    ListLabel?: string;
    ListValue?: string;
    BalanceCount?: string;
    CountItem?: string;
    CountLabel?: string;
    CountValue?: string;
  };
  display_token: InsightsDisplayToken;
};

function CreditBalance(props: CreditBalanceProps): JSX.Element {
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

  const account_balances = insights?.account_balances;

  const revolving = account_balances?.revolving || 0;
  const mortgage = account_balances?.mortgage || 0;
  const installment = account_balances?.installment || 0;

  const total_balance = revolving + mortgage + installment;
  const open_collection_balance = account_balances?.open_collection || 0;
  const open_collection_accounts = insights?.total_accounts?.open_collection || 0;

  return (
    <div className={classes.CreditBalance}>
      <div className={classes.BalanceList}>
        <div className={classes.ListItemHeader}>
          <div className={classes.ListLabel}>Total Balances</div>
          <div className={classes.ListValue}>{toCurrency(total_balance)}</div>
        </div>
        <div className={classes.ListItem}>
          <div className={classes.ListLabel}>Revolving accounts</div>
          <div className={classes.ListValue}>{toCurrency(revolving)}</div>
        </div>
        <div className={classes.ListItem}>
          <div className={classes.ListLabel}>Mortgages</div>
          <div className={classes.ListValue}>{toCurrency(mortgage)}</div>
        </div>
        <div className={classes.ListItem}>
          <div className={classes.ListLabel}>Installment Loans</div>
          <div className={classes.ListValue}>{toCurrency(installment)}</div>
        </div>
      </div>
      <div className={classes.BalanceCount}>
        <div className={classes.CountItem}>
          <div className={classes.CountValue}>{toCurrency(open_collection_balance)}</div>
          <div className={classes.CountLabel}>Past Due Amount</div>
        </div>
        <div className={classes.CountItem}>
          <div className={classes.CountValue}>{open_collection_accounts}</div>
          <div className={classes.CountLabel}>Currently in Collections</div>
        </div>
      </div>
    </div>
  );
}

function toCurrency(num: number) {
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const styles = {
  CreditBalance: {
    width: 400,
    maxWidth: "100%",
    margin: [0, "auto"],
  },
  BalanceList: {
    margin: [0, 0, 20],
  },
  ListItemHeader: {
    extend: "ListItem",
    fontSize: 19,
    fontWeight: 600,
    margin: [0, 0, 15],
  },
  ListItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 17,
    margin: [0, 0, 5],
  },
  ListLabel: {
    flex: 2,
  },
  ListValue: {
    flex: 1,
  },
  BalanceCount: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  CountItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: [20, 10],

    "&:first-child": {
      borderRight: "1px solid #ccc",
    },
  },
  CountValue: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    margin: [0, 0, 8],
  },
  CountLabel: {
    fontSize: 14,
    textAlign: "center",
    color: "#979797",
    lineHeight: 1.12,
  },
};

export default injectSheet(styles as Styles)(CreditBalance);
