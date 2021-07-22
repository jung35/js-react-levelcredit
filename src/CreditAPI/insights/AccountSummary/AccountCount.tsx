import React from "react";
import injectSheet, { Styles } from "react-jss";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { InsightsTotalAccount } from "@levelcredit/js-lib-api/Credit/Insights/types";

type AccountCountProps = { classes: { AccountCount?: string }; total_accounts?: InsightsTotalAccount };

const chart_colors = ["#18b798", "#e2e2e2"];

function AccountCount(props: AccountCountProps): JSX.Element {
  const classes = props.classes;
  const total_accounts = props.total_accounts;

  const total_good = (total_accounts?.total || 0) - (total_accounts?.derogatory || 0);

  const pie_chart_data = [{ value: total_good }, { value: total_accounts?.derogatory || 0 }];
  const label_text = `${total_good}/${total_accounts?.total || 0}`;

  return (
    <div className={classes.AccountCount}>
      <ResponsiveContainer width="100%" height={89}>
        <PieChart>
          <text x="50%" y="50%" dy={2} textAnchor="middle" alignmentBaseline="middle" fontSize="16px">
            {label_text}
          </text>
          <Pie
            data={pie_chart_data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={"100%"}
            innerRadius={"90%"}
            startAngle={270}
            endAngle={-90}
            paddingAngle={0}
            labelLine={false}
          >
            {pie_chart_data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chart_colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = { AccountCount: {} };

export default injectSheet(styles as Styles)(AccountCount);
