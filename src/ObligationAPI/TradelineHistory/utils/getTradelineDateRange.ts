import { TradelineDateRange, TradelineStringDateObject } from "src/ObligationAPI/types";

export default function getTradelineDateRange(date_list: string[]): TradelineDateRange {
  const start_date: TradelineStringDateObject = { year: null, month: null };
  const end_date: TradelineStringDateObject = { year: null, month: null };

  date_list.map(function (date) {
    const [year, month] = date.split("-").map(parseInt);

    if (!start_date.year || start_date.year >= year) {
      start_date.year = year;

      if (!start_date.month || start_date.month > month) {
        start_date.month = month;
      }
    }

    if (!end_date.year || end_date.year <= year) {
      end_date.year = year;

      if (!end_date.month || end_date.month < month) {
        end_date.month = month;
      }
    }
  });

  return { start_date, end_date };
}
