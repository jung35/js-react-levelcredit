import { TUAlertData, TUAlertDataList, TUXMLData, TUXMLDataAlert, TUXMLDataAlertTypeData } from "../types";

export default function parseTUData(data: TUXMLData): (null | TUAlertData)[] {
  if (typeof data !== "object" || "ErrorCode" in data) {
    return [];
  }

  const alerts = data.BundleComponents.BundleComponent.GetAlertsResponseSuccess?.Alerts.AlertType;

  if (!alerts) {
    return [];
  }

  if (alerts instanceof Array) {
    return alerts.map(function (alert) {
      return processAlertDetails(alert);
    });
  }

  return [processAlertDetails(alerts)];
}

function processAlertDetails(alert?: TUXMLDataAlert): null | TUAlertData {
  if (typeof alert !== "object" || !("d3p1:TUCAlert" in alert)) {
    return null;
  }

  const d3p1_tuc_alert = alert["d3p1:TUCAlert"];

  if (!d3p1_tuc_alert || !("d3p1:TUCAlertsDetail" in d3p1_tuc_alert)) {
    return null;
  }

  const alertDetailsObj = d3p1_tuc_alert["d3p1:TUCAlertsDetail"];

  if (!alertDetailsObj) {
    return null;
  }

  const alertType = Object.keys(alertDetailsObj)[0];
  const watchID = alert["d3p1:WatchAlertId"]["$"];
  const list = generateDefinitionList(alertDetailsObj[alertType]);

  return { watchID, list };
}

function generateDefinitionList(o: TUXMLDataAlertTypeData): TUAlertDataList[] {
  const list: TUAlertDataList[] = [];

  Object.keys(o).map((key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val: any = o[key] || {};
    const title = splitCamelCase(key);

    if (typeof val !== "object") {
      return null;
    }

    const sub_keys = Object.keys(val);

    if (sub_keys.length < 1 || sub_keys[0] === "@xsi:nil") {
      return null;
    }

    if (sub_keys.length === 1) {
      list.push([title, val[sub_keys[0]]]);

      return [title, val[sub_keys[0]]];
    }

    const sub_list = generateDefinitionList(val);

    if (sub_list.length === 0) {
      return null;
    }

    list.push([title, sub_list]);

    return [title, sub_list];
  });

  return list;
}

function splitCamelCase(string: string) {
  return string
    .split(":")[1]
    .replace(/([A-Z])/g, " $1")
    .trim();
}
