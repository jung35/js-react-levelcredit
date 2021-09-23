import React, { useCallback, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useMonitoringAlerts from "src/ProtectionAPI/hooks/useMonitoringAlerts";
import groupAlerts from "../utils/groupAlerts";
import Alert, { AlertPropsClasses } from "./Alert";

type MonitoringAlertProps = {
  classes: {
    MonitoringAlert?: string;
    MonitoringAlertList?: string;
    AlertMonitoringDismissed?: string;
    MonitoringAlertButton?: string;
  } & AlertPropsClasses;
  allow_dismissed_alerts?: boolean;
  show_dismissed_alerts?: boolean;
  show_view_history_button?: boolean;
};

function MonitoringAlert(props: MonitoringAlertProps) {
  const classes = props.classes;
  // Permission for user to see dismissed alerts
  const allow_dismissed_alerts =
    typeof props.allow_dismissed_alerts === "boolean" ? props.allow_dismissed_alerts : true;

  // Render component with dismissed alerts visible
  const show_dismissed_alerts = typeof props.show_dismissed_alerts === "boolean" ? props.show_dismissed_alerts : false;

  // Render component with view history button visible
  const show_view_history_button =
    typeof props.show_view_history_button === "boolean" ? props.show_view_history_button : true;

  const [alerts] = useMonitoringAlerts();
  const [active_alerts, dismissed_alerts] = groupAlerts(alerts);
  const [show_dismissed, setShowDismissed] = useState(show_dismissed_alerts);

  const onClickDismissed = useCallback(function () {
    setShowDismissed((state) => !state);
  }, []);

  return (
    <div className={classes.MonitoringAlert}>
      <ul className={classes.MonitoringAlertList}>
        {active_alerts.map(function (alert) {
          return <Alert key={alert.id} classes={classes} alert={alert} />;
        })}
      </ul>
      {allow_dismissed_alerts && (
        <div
          className={classes.AlertMonitoringDismissed}
          style={{ maxHeight: (show_dismissed ? dismissed_alerts.length * 100 : 0) + "px" }}
        >
          <ul className={classes.MonitoringAlertList}>
            {dismissed_alerts.map(function (alert) {
              return <Alert key={alert.id} classes={classes} alert={alert} />;
            })}
          </ul>
        </div>
      )}
      {allow_dismissed_alerts && show_view_history_button && (
        <button className={classes.MonitoringAlertButton} onClick={onClickDismissed}>
          {show_dismissed ? "Close history" : "View history"}
        </button>
      )}
    </div>
  );
}

const styles: unknown = {
  MonitoringAlert: {},
  MonitoringAlertList: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  AlertMonitoringDismissed: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 250ms ease-out",
    opacity: 0.6,
  },
  MonitoringAlertButton: {
    alignItems: "center",
    background: "#ececec",
    color: "#2d3b4e",
    cursor: "pointer",
    display: "flex",
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    padding: [15],
    justifyContent: "center",
    lineHeight: 1,
    margin: [15, 0, 0],
    textTransform: "none",
    borderRadius: 4,
    width: "100%",
    border: 0,
    transition: "background-color .18s ease-in",
  },
};

export default injectSheet(styles as Styles)(MonitoringAlert);
