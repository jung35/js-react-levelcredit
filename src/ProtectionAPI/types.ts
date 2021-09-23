export type TUXMLData = TUXMLDataSuccess | TUXMLDataError;

interface TUXMLDataSuccess {
  BundleComponents: {
    BundleComponent: {
      GetAlertsResponseSuccess?: {
        Alerts: {
          AlertType: TUXMLDataAlert | TUXMLDataAlert[];
        };
      };
    };
  };
}

interface TUXMLDataError {
  ErrorCode: "string";
}

export interface TUXMLDataAlert {
  "d3p1:TUCAlert"?: {
    "d3p1:TUCAlertsDetail"?: {
      [alert_type: string]: TUXMLDataAlertTypeData;
    };
  };
  "d3p1:WatchAlertId": { $: string };
}

export interface TUXMLDataAlertTypeData {
  [k: string]: string;
}

export interface TUAlertData {
  watchID: string;
  list: TUAlertDataList[];
}

export type TUAlertDataList = [string, TUAlertDataList[] | string];

export type MonitoringType =
  | "HardInquiry"
  | "FraudAlert"
  | "DelinquentAccount"
  | "NewAccount"
  | "NewBankruptcy"
  | "NewAddress"
  | "NewEmployment"
  | "NewPublicRecord"
  | "NewPublic"
  | "NewCollection"
  | "ImprovedAccount"
  | "NewInquiry"
  | "NewTrade"
  | "TradeBankrupt"
  | "DerogatoryTrade"
  | "FraudStatement"
  | "ImprovedTrade";
