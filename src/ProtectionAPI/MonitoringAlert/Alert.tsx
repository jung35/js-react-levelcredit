import { AlertSimple } from "@levelcredit/js-lib-api/Protection/types";
import React, { useCallback, useEffect, useState } from "react";
import injectSheet, { Styles } from "react-jss";
import useLoadTUScript from "src/ProtectionAPI/hooks/useLoadTUScript";
import useMonitoringAlerts from "src/ProtectionAPI/hooks/useMonitoringAlerts";
import { MonitoringType, TUAlertData } from "src/ProtectionAPI/types";
import AlertData, { AlertDataClasses } from "src/ProtectionAPI/MonitoringAlert/AlertData";
import moment from "moment";
import cx from "classnames";
import AlertLoading, { AlertLoadingClasses } from "./AlertLoading";
import { CSSTransition } from "react-transition-group";
import useIsMounted from "src/utils/useIsMounted";

export type AlertProps = {
  classes: AlertPropsClasses;

  alert: AlertSimple;
};

export type AlertPropsClasses = {
  Alert?: string;
  AlertInfo?: string;
  AlertDetails?: string;
  AlertInfoType?: string;
  AlertInfoDate?: string;
  AlertInfoDismiss?: string;
  AlertInfoDismissed?: string;
  AlertInfoOpen?: string;
  AlertInfoOpenIcon?: string;
  AlertInfoOpenIconOpened?: string;
  AlertDetailsEnter?: string;
  AlertDetailsEnterActive?: string;
  AlertDetailsExit?: string;
  AlertDetailsExitActive?: string;
} & AlertDataClasses &
  AlertLoadingClasses;

function Alert(props: AlertProps) {
  const classes = props.classes;
  const alert = props.alert;
  const [data, setData] = useState<null | TUAlertData[]>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const fetchTUData = useLoadTUScript();
  const [, fetchAlerts, dismissAlert] = useMonitoringAlerts();
  const [dismiss_saving, setDismissSaving] = useState(false);
  const mounted = useIsMounted();

  const get_alert_data = !data && !loading && open;
  const alert_id = alert.id;

  useEffect(
    function () {
      if (get_alert_data) {
        (async function () {
          if (!mounted.current) {
            return;
          }

          setLoading(true);
          try {
            const alert = await fetchAlerts(alert_id);
            if (!mounted.current) {
              return;
            }

            if ("product_display_id" in alert && alert.product_display_id) {
              const data = await fetchTUData(alert.product_display_id);

              if (!mounted.current) {
                return;
              }
              setData(data);
            } else {
              setData([]);
            }
          } catch (error) {
            if (!mounted.current) {
              return;
            }
            setData(null);
          }
          setLoading(false);
        })();
      }
    },
    [alert_id, fetchAlerts, fetchTUData, get_alert_data, mounted]
  );

  const onOpen = useCallback(function () {
    setOpen((state) => !state);
  }, []);

  const onDismiss = useCallback(
    async function (e) {
      // dont trigger toggle open
      e.preventDefault();
      e.stopPropagation();

      setDismissSaving(true);

      await dismissAlert(alert_id);
      await fetchAlerts();
    },
    [alert_id, dismissAlert, fetchAlerts]
  );

  const created_date = moment(alert.created_at);

  return (
    <li className={classes.Alert}>
      <div className={classes.AlertInfo} onClick={onOpen}>
        <div className={classes.AlertInfoType}>{monitoring_types[alert.alert_type as MonitoringType]}</div>
        <div className={classes.AlertInfoDate}>{created_date.format("MMMM D, YYYY")}</div>

        {!alert.dismissed_at && (
          <button
            className={cx({
              [classes.AlertInfoDismiss as string]: !alert.dismissed_at,
              [classes.AlertInfoDismissed as string]: alert.dismissed_at,
            })}
            disabled={dismiss_saving || Boolean(alert.dismissed_at)}
            onClick={onDismiss}
          >
            Dismiss
          </button>
        )}

        <div className={classes.AlertInfoOpen}>
          <svg
            className={cx(classes.AlertInfoOpenIcon, { [classes.AlertInfoOpenIconOpened as string]: open })}
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
          </svg>
        </div>
      </div>
      <CSSTransition
        in={open}
        timeout={200}
        classNames={{
          enter: classes.AlertDetailsEnter,
          enterActive: classes.AlertDetailsEnterActive,
          enterDone: classes.AlertDetailsEnterActive,
          exit: classes.AlertDetailsExit,
          exitActive: classes.AlertDetailsExitActive,
          exitDone: classes.AlertDetailsExitActive,
        }}
      >
        <div className={classes.AlertDetails}>
          {loading ? <AlertLoading classes={classes} /> : <AlertData classes={classes} data={data} />}
        </div>
      </CSSTransition>
    </li>
  );
}

const styles: unknown = {
  Alert: {
    margin: [15, 0, 0],
    padding: 0,
    border: "1px solid #e6e6e6",
    background: "#fcfcfc",
  },

  AlertInfo: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: [15, 19],
  },

  AlertInfoType: {
    fontSize: 15,
    lineHeight: 1,
    color: "#020202",
    margin: 0,
  },

  AlertInfoDate: {
    flex: 1,
    fontSize: 14,
    lineHeight: 1,
    color: "#979797",
    display: "flex",
    alignItems: "center",

    "&:before": {
      content: '"·"',
      display: "block",
      fontSize: 25,
      fontWeight: 700,
      lineHeight: 0,
      verticalAlign: "middle",
      margin: [0, 7],
    },
  },

  AlertInfoDismiss: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    height: 32,
    padding: [0, 18],
    margin: [0, 15, 0, 0],
    backgroundColor: "#21cc6f",
    borderRadius: 3,
    textTransform: "none",
    fontSize: 13,
    fontWeight: 500,
    color: "#fff",
    border: 0,

    "&:disabled": {
      backgroundColor: "rgba(33, 204, 111, 0.6)",
    },
  },

  AlertInfoDismissed: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    height: 32,
    padding: [0, 18],
    margin: [0, 15, 0, 0],
    borderRadius: 3,
    textTransform: "none",
    fontSize: 13,
    fontWeight: 500,
    color: "#000",
    border: 0,
    backgroundColor: "transparent",
  },

  AlertInfoOpen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  AlertInfoOpenIcon: {
    fill: "#000",
    display: "block",
    width: 27,
    fontSize: 27,
    transform: "rotate(0deg)",
    transition: "transform 180ms ease-in",
  },

  AlertInfoOpenIconOpened: {
    transform: "rotate(180deg)",
  },

  AlertDetails: {
    display: "flex",
    flexWrap: "wrap",
    background: "#fff",
    border: "0px solid transparent",
    padding: [0, 25],
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 250ms ease-out, border 250ms ease-out, padding 250ms ease-out",
  },

  AlertDetailsEnter: {
    maxHeight: 0,
  },
  AlertDetailsEnterActive: {
    padding: [15, 25],
    border: "5px solid #f7f9fb",
    maxHeight: 700,
  },
  AlertDetailsExit: {
    padding: [15, 25],
    border: "5px solid #f7f9fb",
    maxHeight: 700,
  },
  AlertDetailsExitActive: {
    maxHeight: 0,
  },
};

export default injectSheet(styles as Styles)(Alert);

const monitoring_types: { [key in MonitoringType]: string } = {
  HardInquiry: "Hard Inquiry",
  FraudAlert: "Fraud Alert",
  DelinquentAccount: "Delinquent Account",
  NewAccount: "New Account",
  NewBankruptcy: "New Bankruptcy",
  NewAddress: "New Address",
  NewEmployment: "New Employment",
  NewPublicRecord: "New Public Record",
  NewPublic: "New Public Record",
  NewCollection: "New Collection",
  ImprovedAccount: "Improved Account",
  NewInquiry: "New Inquiry",
  NewTrade: "New Tradeline",
  TradeBankrupt: "Trade Bankrupt",
  DerogatoryTrade: "Derogatory Tradeline",
  FraudStatement: "Fraud Statement",
  ImprovedTrade: "Improved Tradeline",
};
