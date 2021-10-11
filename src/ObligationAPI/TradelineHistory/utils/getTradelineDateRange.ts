import { TradelineDateRange, TradelineHistoryDataStyle, TradelineStringDateObject } from "src/ObligationAPI/types";
import dayjs from "dayjs";

const last_24_months = dayjs().subtract(23, "month");

export default function getTradelineDateRange(
  date_list: string[],
  data_style: TradelineHistoryDataStyle
): TradelineDateRange {
  const start_date: TradelineStringDateObject = { year: null, month: null };
  const end_date: TradelineStringDateObject = { year: null, month: null };

  if (data_style === "last-24-datasets") {
    date_list = date_list.slice(0, 24);
  }

  date_list.map(function (date) {
    const [year, month] = date.split("-").map((s) => parseInt(s));

    if (data_style === "last-24-months") {
      if (last_24_months.year() > year || (last_24_months.year() === year && last_24_months.month() >= month)) {
        return;
      }
    }

    if (!start_date.year || start_date.year >= year) {
      if (!start_date.year || start_date.year > year) {
        // When there is no year or year is completely different, then we should reset the month
        start_date.year = year;
        start_date.month = 12;
      }

      if (!start_date.month || start_date.month > month) {
        start_date.month = month;
      }
    }

    if (!end_date.year || end_date.year <= year) {
      if (!end_date.year || end_date.year < year) {
        // When there is no year or year is completely different, then we should reset the month
        end_date.year = year;
        end_date.month = 1;
      }

      if (!end_date.month || end_date.month < month) {
        end_date.month = month;
      }
    }
  });

  return { start_date, end_date };
}
