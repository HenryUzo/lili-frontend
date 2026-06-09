import { useEffect } from "react";
import { VETERINARY_CARE_STRUCTURED_DATA } from "../../../lib/seo-config";
import {
  clearStructuredData,
  upsertStructuredData,
} from "../../../lib/headManager";

export default function SitewideStructuredData() {
  useEffect(() => {
    upsertStructuredData("sitewide", [VETERINARY_CARE_STRUCTURED_DATA]);

    return () => {
      clearStructuredData("sitewide");
    };
  }, []);

  return null;
}
