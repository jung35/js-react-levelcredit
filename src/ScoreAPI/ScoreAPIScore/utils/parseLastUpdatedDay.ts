export default function parseLastUpdatedDay(last_updated: Date): number {
  const updated_date = +last_updated;
  const today = +new Date();

  const time_diff = today - updated_date;
  const days_diff = Math.ceil(time_diff / (24 * 3600 * 1000));

  return days_diff;
}
