import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { CreditAPIError, CreditDisplayToken } from "../types";

type FetchUserInsights = (credit_display_token: CreditDisplayToken) => Promise<InsightsObj>;
export type InsightsObj = {
  account_balances: InsightsAccountBalance;
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
    async function (credit_display_token: CreditDisplayToken) {
      if (!credit_display_token) {
        throw new Error("missing display_token");
      }

      const res = await window.fetch(`${api_url}/api/credit/insights/${credit_display_token}`);

      return res.json();
    },
    [api_url]
  );

  return fetchScores;
}
