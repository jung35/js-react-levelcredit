import { APIAuthType, EnvType } from "@levelcredit/js-lib-api/types";

export type LevelCreditProviderProps = {
  /**
   * Options: "development" | "sandbox" | "production"
   */
  env?: EnvType;

  /**
   * @deprecated use base_url instead
   */
  api_url?: string;

  /**
   * Override base api url set by the "env"
   */
  base_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

export type OptionalLevelCreditSettings = {
  env?: EnvType;
  base_url?: string;
  auth_token?: string;
  auth_type?: APIAuthType;
};

export type APILoadingStatusRef<ReturnObject> = {
  promise: null | Promise<ReturnObject>;
  loading: boolean;
  pending: boolean;
};
