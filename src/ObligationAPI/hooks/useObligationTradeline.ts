import LevelCreditAPI from "@levelcredit/js-lib-api";
import { ObligationType } from "@levelcredit/js-lib-api/Obligation/types";
import { useCallback } from "react";
import { useLevelCredit } from "src/LevelCreditProvider";
import { ObligationTradelineObject } from "../types";

type FetchObligationTradeline = (
  obligation: ObligationType,
  obligation_id: number
) => Promise<ObligationTradelineObject>;

export default function useObligationTradeline(): FetchObligationTradeline {
  const settings = useLevelCredit();

  const fetch: FetchObligationTradeline = useCallback(
    async function (obligation, obligation_id) {
      if (!obligation) {
        throw new Error("missing obligation: 'contracts', 'leases', or 'utilities'");
      } else if (!obligation_id) {
        throw new Error("missing obligation id");
      }

      const res = await LevelCreditAPI.Obligation.Tradeline(settings, { type: obligation, id: obligation_id });

      return await res.json();
    },
    [settings]
  );

  return fetch;
}
