export type ObligationTradelineObject = { [key: string]: TradelineStatusObject };
export type TradelineStatusObject = { status: TradelineStatus };
export type TradelineStatus =
  | "POSITIVE_REPORT"
  | "POSITIVE_LOOKBACK_REPORT"
  | "POSITIVE_LOOKBACK_AVAILABLE"
  | "PENDING_REPORT_HOLD"
  | "PENDING_REPORT"
  | "NEGATIVE_LATE_30"
  | "NEGATIVE_LATE_60"
  | "NEGATIVE_LATE_90"
  | "NEGATIVE_LATE_120"
  | "NEGATIVE_LATE_150"
  | "NEGATIVE_LATE_180"
  | "NO_PAYMENT";

export type TradelineStringDateObject = { year: number | null; month: number | null };
export type TradelineDateRange = { start_date: TradelineStringDateObject; end_date: TradelineStringDateObject };
export type TradelineHistoryDataStyle = "last-24-months" | "last-24-datasets" | "all";
