import React from "react";
import injectSheet, { Styles } from "react-jss";

type AlertLoadingProps = { classes: AlertLoadingClasses };
export type AlertLoadingClasses = { AlertLoading?: string };

function AlertLoading(props: AlertLoadingProps) {
  const classes = props.classes;

  return <div className={classes.AlertLoading}></div>;
}

const styles: unknown = {
  AlertLoading: {
    display: "block",
    width: 200,
    maxWidth: "100%",
    height: 9,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
};

export default injectSheet(styles as Styles)(AlertLoading);
