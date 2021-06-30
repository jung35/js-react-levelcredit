import { LevelCreditProviderProps } from "src/LevelCreditProvider";

export default function getLevelCreditApiURL(values: LevelCreditProviderProps): string {
  if (values.api_url) {
    return values.api_url;
  }

  if (values.env) {
    switch (values.env) {
      case "development":
        return "https://mylevelcredit.qa2.rt-devel.com";

      case "sandbox":
        return "https://mylevelcredit.sandbox2.rt-stg.com";

      case "production":
        return "https://my.levelcredit.com";
    }
  }

  throw new Error("missing env");
}
