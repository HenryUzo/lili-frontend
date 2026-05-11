import { Helmet } from "react-helmet-async";
import { VETERINARY_CARE_STRUCTURED_DATA } from "../../../lib/seo-config";

export default function SitewideStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(VETERINARY_CARE_STRUCTURED_DATA)}
      </script>
    </Helmet>
  );
}
