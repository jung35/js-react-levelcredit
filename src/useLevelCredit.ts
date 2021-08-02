import { APIFetchSettings } from "@levelcredit/js-lib-api/types";
import { createContext, useContext } from "react";

export const LevelCreditContext = createContext<APIFetchSettings>({ env: "production" });

export default function useLevelCredit(): APIFetchSettings {
  return useContext(LevelCreditContext);
}
