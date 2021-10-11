import dayjs from "dayjs";
import { ScoreObject, ScoreObjectScores } from "@levelcredit/js-lib-api/Credit/Score/types";

type ChartScoreData = { month: string; date?: string; score?: number };
export type ChartScoreParseStyle = "11-months-past" | "12-scores";
type ChartScoreParsedData = [Array<ChartScoreData>, ChartMinScore, ChartMaxScore];

type ChartMinScore = number | null;
type ChartMaxScore = number | null;

export default function parseScoresForChart(
  scores: ScoreObject | null,
  style: ChartScoreParseStyle
): ChartScoreParsedData {
  if (!scores?.scores) {
    return [[], null, null];
  }

  let score_data: Array<ChartScoreData>;

  if (style === "11-months-past") {
    score_data = parseStyle11Months(scores.scores);
  } else if (style === "12-scores") {
    score_data = parseStyle12Scores(scores.scores);
  } else {
    return [[], null, null];
  }

  const scores_list = score_data
    .map(function (chart_data) {
      return chart_data.score;
    })
    .filter(Number) as Array<number>;

  return [score_data, Math.min(...scores_list), Math.max(...scores_list)];
}

function parseStyle12Scores(scores: ScoreObjectScores): Array<ChartScoreData> {
  const scores_dates = Object.keys(scores).slice(0, 12);
  const scores_list = Object.values(scores)
    .slice(0, 12)
    .map(function (score) {
      return parseInt(score);
    });

  const scores_data = scores_dates
    .map(function (date_string, i) {
      const date = dayjs(date_string, "YYYY-MM-DD");

      return { month: date.format("MMM"), date: date.format("MMM D, YYYY"), score: scores_list[i] };
    })
    .reverse();

  return scores_data;
}

function parseStyle11Months(scores: ScoreObjectScores): Array<ChartScoreData> {
  const scores_dates = Object.keys(scores);
  const scores_monthyear = scores_dates.map(function (date_string) {
    return date_string.substring(2, 7); // '5678-12-34' => '78-12'
  });
  const scores_list = Object.values(scores).map(function (score) {
    return parseInt(score);
  });

  const scores_data: Array<ChartScoreData> = [];
  const start_date = dayjs().add(1, "month").startOf("month");

  for (let i = 0; i < 13; i++) {
    const temp_month = start_date.clone().subtract(i, "month");
    const list_index = scores_monthyear.findIndex(function (monthyear_string) {
      return monthyear_string === temp_month.format("YY-MM");
    });

    const score_date = list_index !== -1 ? dayjs(scores_dates[list_index], "YYYY-MM-DD") : null;
    const score = list_index !== -1 ? scores_list[list_index] : null;

    scores_data.push({
      month: temp_month.format("MMM"),
      date: score_date && score_date.isValid() ? score_date.format("MMM D, YYYY") : undefined,
      score: score || undefined,
    });
  }

  return scores_data.reverse();
}
