import React from "react";
import injectSheet, { Styles } from "react-jss";
import cx from "classnames";
import { TUAlertData } from "src/ProtectionAPI/types";

export type AlertDataClasses = {
  AlertData?: string;
  AlertDataHasChildren?: string;
  AlertDataTitle?: string;
  AlertDataDescription?: string;
  AlertDataChildren?: string;
};

type AlertDataProps = { classes: AlertDataClasses; data: null | TUAlertData[] };

function AlertData(props: AlertDataProps) {
  const classes = props.classes;
  const data = props.data;

  if (data instanceof Array && data.length > 0) {
    return (
      <>
        {data[0].list.map(function ([title, desc], i) {
          const desc_is_array = desc instanceof Array;

          return (
            <div key={i} className={cx(classes.AlertData, { [classes.AlertDataHasChildren as string]: desc_is_array })}>
              {!desc_is_array && <div className={classes.AlertDataTitle}>{title}</div>}
              <div className={classes.AlertDataDescription}>
                {!desc_is_array ? (
                  desc
                ) : (
                  <div className={classes.AlertDataChildren}>
                    {desc.map(function ([sub_title, sub_desc], j) {
                      return (
                        <div key={j}>
                          <div className={classes.AlertDataTitle}>{sub_title}</div>
                          <div className={classes.AlertDataDescription}>{sub_desc}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className={classes.AlertData}>
      <div className={classes.AlertDataDescription}>Data not available</div>
    </div>
  );
}

const styles: unknown = {
  AlertData: {
    width: "50%",
  }, // half width
  AlertDataHasChildren: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    whiteSpace: "nowrap",
  }, // full width
  AlertDataDescription: {
    fontWeight: 500,
    color: "#000",
  },
  AlertDataTitle: {
    color: "#979797",
    fontSize: 13,
    margin: [5, 0, 3],
    fontWeight: "normal",
  },
  AlertDataChildren: {},
};

export default injectSheet(styles as Styles)(AlertData);
