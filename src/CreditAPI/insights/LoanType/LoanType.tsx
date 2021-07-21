import React, { useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import { CreditDisplayToken } from "src/CreditAPI/types";
import useInsights from "../useInsights";
import { InsightsObject } from "@levelcredit/js-lib-api/Credit/Insights/types";

type LoanTypeProps = {
  classes: {
    LoanType?: string;
    LoanTypeTypes?: string;
    LoanTypeType?: string;
    LoanTypeDots?: string;
    LoanTypePercents?: string;
  };

  show_dots_percent?: boolean;
  display_token: CreditDisplayToken;
};

type LoanTypeID = "revolving" | "installment" | "mortgage";

type LoanTypeItem = {
  id: LoanTypeID;
  label: string;
  color: string;
};

type LoanTypePercents = {
  revolving: number | null;
  installment: number | null;
  mortgage: number | null;
};

const loan_summary_types: LoanTypeItem[] = [
  { id: "revolving", label: "Credit Card", color: "#468ee5" },
  { id: "installment", label: "Installment Loans", color: "#e59346" },
  { id: "mortgage", label: "Revolving Mortgage", color: "#18b798" },
];

const dots_count = 40;
const loop_array = new Array(dots_count).fill(0);

function LoanType(props: LoanTypeProps): JSX.Element {
  const classes = props.classes;
  const display_token = props.display_token;
  const show_dots_percent = props.show_dots_percent !== undefined ? props.show_dots_percent : true;

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

  const account_balances = insights?.account_balances;
  const total_amount =
    (account_balances?.installment || 0) + (account_balances?.revolving || 0) + (account_balances?.mortgage || 0);

  const percents: LoanTypePercents = {
    revolving: getLoanPercentage(account_balances?.revolving, total_amount),
    installment: getLoanPercentage(account_balances?.installment, total_amount),
    mortgage: getLoanPercentage(account_balances?.mortgage, total_amount),
  };

  return (
    <div className={classes.LoanType}>
      <div className={classes.LoanTypeTypes}>
        {loan_summary_types.map(function (loan_type) {
          const percent = percents[loan_type.id];

          return (
            <div
              key={loan_type.id}
              className={`${classes.LoanTypeType} ${typeof percent === "number" && percent > 0 ? loan_type.id : ""}`}
            >
              <span>{percent || 0}%</span>
              {loan_type.label}
            </div>
          );
        })}
      </div>
      <div className={classes.LoanTypeDots}>
        {loop_array.map(function (val, i) {
          const summary_type = getDotLoanTypeType(i, dots_count, percents);

          return <div key={i} className={summary_type || ""} />;
        })}
      </div>
      {show_dots_percent && (
        <div className={classes.LoanTypePercents}>
          {loan_summary_types.map(function (loan_type) {
            const percent = percents[loan_type.id];
            if (typeof percent !== "number" || percent <= 1 || isNaN(percent)) {
              return null;
            }

            return (
              <div key={loan_type.id} className={loan_type.id} style={{ width: `${percent}%` }}>
                {percent}%
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getLoanPercentage(amount: number | undefined, total: number): number | null {
  if (typeof amount === "number" && amount >= 0) {
    const perecnt = (amount / total) * 100;

    return parseFloat(perecnt.toFixed(1));
  }

  return null;
}

function getDotLoanTypeType(dot_index: number, dot_max: number, percents: LoanTypePercents): LoanTypeID | null {
  const revolving = typeof percents.revolving === "number" ? percents.revolving : null;
  const installment = typeof percents.installment === "number" ? percents.installment : null;
  const mortgage = typeof percents.mortgage === "number" ? percents.mortgage : null;

  const dot_position = (dot_index / dot_max) * 100;

  let offset = 0;

  if (typeof revolving === "number" && revolving >= 1 && revolving > dot_position) {
    return "revolving";
  }

  offset += revolving || 0;
  if (typeof installment === "number" && installment >= 1 && offset + installment > dot_position) {
    return "installment";
  }

  offset += installment || 0;
  if (typeof mortgage === "number" && mortgage >= 1 && offset + mortgage > dot_position) {
    return "mortgage";
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loan_types_bullet_styles: any = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loan_types_dot_styles: any = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loan_types_percent_styles: any = {};

for (let i = 0; i < loan_summary_types.length; i++) {
  loan_types_bullet_styles[`&.${loan_summary_types[i].id}`] = {
    "&:before": { borderColor: loan_summary_types[i].color },
  };

  loan_types_dot_styles[`&.${loan_summary_types[i].id}`] = {
    background: loan_summary_types[i].color,
  };

  loan_types_percent_styles[`&.${loan_summary_types[i].id}`] = {
    color: loan_summary_types[i].color,
  };
}

const styles = {
  LoanType: {
    width: "100%",
    maxWidth: 400,
    margin: [0, "auto"],
  },
  LoanTypeTypes: (props: LoanTypeProps) => ({
    marginBottom: props.show_dots_percent === false ? 15 : 25,
  }),
  LoanTypeType: {
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#979797",
    padding: [0, 20, 0, 0],

    "&:before": {
      content: '""',
      display: "block",
      width: 6,
      height: 6,
      border: "2px solid #ccc",
      borderRadius: "50%",
      margin: [0, 8, 0, 0],
    },

    ...loan_types_bullet_styles,

    "& span": {
      fontWeight: 600,
      display: "inline-block",
      color: "#000",
      margin: [0, 5, 0, 0],
    },
  },
  LoanTypeDots: {
    display: "flex",
    justifyContent: "space-between",

    "& > div": {
      width: 6,
      height: 10,
      borderRadius: 3,
      background: "#d8d8d8",
      "&:nth-child(even)": {
        display: "none",
        "@media (min-width: 600px)": { display: "block" },
      },

      ...loan_types_dot_styles,
    },
  },
  LoanTypePercents: {
    display: "flex",
    margin: [2, 0, 0],
    fontSize: 14,

    "& div": {
      position: "relative",

      "&:nth-child(odd)": {
        top: -33,
      },

      ...loan_types_percent_styles,
    },
  },
};

export default injectSheet((styles as unknown) as Styles)(LoanType);
