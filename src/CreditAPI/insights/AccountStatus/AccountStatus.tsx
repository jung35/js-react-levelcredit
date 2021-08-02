import React from "react";
import injectSheet, { Styles } from "react-jss";
import { CreditDisplayToken } from "src/CreditAPI/types";
import useInsights from "../useInsights";

type AccountStatusProps = {
  classes: {
    AccountStatus?: string;
  };

  display_token: CreditDisplayToken;
};

function AccountStatus(props: AccountStatusProps): JSX.Element | null {
  const classes = props.classes;
  const display_token = props.display_token;

  const [insights] = useInsights(display_token);

  const derogatory = insights?.total_accounts?.derogatory;

  if (typeof derogatory !== "number") {
    return null;
  }

  return (
    <div className={`${classes.AccountStatus} ${derogatory === 0 ? "good" : "bad"}`}>
      {derogatory === 0 ? "Good standing" : `${derogatory} potentially negative standing`}
    </div>
  );
}

const styles = {
  AccountStatus: {
    display: "inline-block",
    fontWeight: 500,
    fontSize: 13,
    padding: [6, 20],
    lineHeight: 1,
    borderRadius: 16,
    border: "1px solid transparent",
    textAlign: "center",

    "&.good": {
      color: "#00a45f",
      borderColor: "#00a45f",
    },
    "&.bad": {
      color: "#bc2026",
      borderColor: "#bc2026",
    },
  },
};

export default injectSheet(styles as Styles)(AccountStatus);
