import React, { createContext, useContext } from "react";
import getLevelCreditApiURL from "./utils/getLevelCreditApiURL";

type LevelCreditEnv = "development" | "sandbox" | "production";

export type LevelCreditProviderProps = { env?: LevelCreditEnv; api_url?: string; children?: JSX.Element };

type LevelCreditSettings = { api_url: string };

const LevelCreditContext = createContext<LevelCreditProviderProps | null>(null);

export function LevelCreditProvider(props: LevelCreditProviderProps): JSX.Element {
  const { children, ...rest } = props;

  return <LevelCreditContext.Provider value={rest}>{children}</LevelCreditContext.Provider>;
}

export function useLevelCredit(): LevelCreditSettings {
  const values = useContext(LevelCreditContext);

  const api_url = getLevelCreditApiURL(values || {});

  return { api_url };
}
