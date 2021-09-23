import { AlertSimple } from "@levelcredit/js-lib-api/Protection/types";

export default function groupAlerts(alerts: null | AlertSimple[]): [AlertSimple[], AlertSimple[]] {
  const active_alerts: AlertSimple[] = [];
  const dismised_alerts: AlertSimple[] = [];

  if (alerts) {
    for (let i = 0; i < alerts.length; i++) {
      const alert = alerts[i];

      if (alert.dismissed_at) {
        dismised_alerts.push(alert);
      } else {
        active_alerts.push(alert);
      }
    }
  }

  return [active_alerts, dismised_alerts];
}
