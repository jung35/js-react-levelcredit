import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { CreditAPIError } from "../types";

type FetchUserInsights = (insight_display_token: InsightsDisplayToken) => Promise<InsightsObj>;
export type InsightsDisplayToken = string;
export type InsightsObj = {
  account_balance: InsightsAccountBalance;
  total_monthly_payments: number;
  total_accounts: InsightsTotalAccount;
  total_public_records: number;
  utilization: number;
  total_inquiries: number;
  oldest_tradeline_years: number;
  bureau: string;
  next_update: string;
  messages: Array<CreditAPIError>;
};

type InsightsAccountBalance = {
  revolving: number;
  mortgage: number;
  installment: number;
  open_collection: number;
};

export type InsightsTotalAccount = {
  total: number;
  open: number;
  closed: number;
  derogatory: number;
  open_collection: number;
};

export default function useInsights(): FetchUserInsights {
  const { api_url } = useLevelCredit();

  const fetchScores: FetchUserInsights = useCallback(
    async function (score_display_token) {
      if (!score_display_token) {
        throw new Error("missing display_token");
      }

      const res = await window.fetch(`${api_url}/api/credit/insights/${score_display_token}`);

      return res.json();
    },
    [api_url]
  );

  return fetchScores;
}
