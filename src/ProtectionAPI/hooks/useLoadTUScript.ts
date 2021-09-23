import { EnvType } from "@levelcredit/js-lib-api/types";
import { useCallback } from "react";
import useLevelCredit from "src/useLevelCredit";
import loadScript from "src/utils/loadScript";
import { TUAlertData, TUXMLData } from "../types";
import parseTUData from "../utils/parseTUData";

declare let data: TUXMLData; // global variable created by the TU script
type LoadTUScript = (product_display_id: string) => Promise<TUAlertData[]>;

export default function useLoadTUScript(): LoadTUScript {
  const settings = useLevelCredit();
  const tu_url = getTUUrl("env" in settings ? settings.env : "production");

  const loadTU = useCallback(
    function (product_display_id: string): Promise<TUAlertData[]> {
      return new Promise(function (resolve) {
        const script_url = `${tu_url}/dsply.aspx?pdt=${product_display_id}&xsl=CC2RENTTRACK_GENERIC_JSON`;

        loadScript(script_url, function () {
          const result = parseTUData(data);
          resolve(result.filter((data) => data) as TUAlertData[]);
        });
      });
    },
    [tu_url]
  );

  return loadTU;
}

function getTUUrl(env: EnvType): string {
  if (env === "production") {
    return "https://consumerconnect.tui.transunion.com";
  }

  return "https://cc2-live.sd.demo.truelink.com";
}
