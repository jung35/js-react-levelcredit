import { APIAuthType } from "@levelcredit/js-lib-api/types";

export type LevelCreditEnv = "development" | "sandbox" | "production";

export type LevelCreditProviderProps = {
  env?: LevelCreditEnv;
  api_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

export type OptionalLevelCreditSettings = {
  env?: LevelCreditEnv;
  base_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

export type APILoadingStatusRef<ReturnObject> = {
  promise: null | Promise<ReturnObject>;
  loading: boolean;
  pending: boolean;
};
